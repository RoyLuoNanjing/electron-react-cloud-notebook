import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FileSearch } from '../components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileList, IFile } from '../components/FileList';
import {
  faPlus,
  faFileImport,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { flattenArr, objToArr } from '../utils/helper';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { BottomBtn } from '../components/BottomBtn';
import { TabList } from '../components/TabList';
import useIpcRenderer from '../hooks/useIpcRenderer';
import { useEffect, useState } from 'react';
import fileHelper from '../utils/fileHelper';

// require node.js modules
const { join, basename, extname, dirname } = window.require('path');

const { ipcRenderer } = window.require('electron');
const remote = window.require('@electron/remote');
const Store = window.require('electron-store');

const fileStore = new Store({ name: 'Files Data' });
const saveFilesToStore = (files: IFile) => {
  //we don't have to store any info in file system, eg: isNew, BODY, ETC
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createdAt } = file;
    result[id] = {
      id,
      path,
      title,
      createdAt,
    };
    return result;
  }, {});
  fileStore.set('files', filesStoreObj);
};

function Hello() {
  const [files, setFiles] = useState(fileStore.get('files') || {});
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenFileIDs] = useState<string[]>([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState<string[]>([]);
  const [searchedFiles, setSearchedFiles] = useState<IFile[]>([]);
  const filesArr = objToArr(files);
  const savedLocation = remote.app.getPath('documents');
  const activeFile = files[activeFileID];
  const openedFiles = openedFileIDs
    .map((openID) => files[openID])
    .filter((file) => file !== undefined) as IFile[];

  const fileClick = (fileID: string) => {
    //set current active file
    setActiveFileID(fileID);

    const currentFile = files[fileID];
    if (!currentFile.isLoaded) {
      //@ts-ignore
      fileHelper.readFile(currentFile.path).then((value) => {
        const newFile = { ...files[fileID], body: value, isLoaded: true };
        setFiles({ ...files, [fileID]: newFile });
      });
    }
    //if openedFiles don't have the current ID
    //then add new fileID to openedFiles
    if (!openedFileIDs.includes(fileID)) {
      setOpenFileIDs([...openedFileIDs, fileID]);
    }
  };

  const tabClick = (fileID: string) => {
    //set current active file
    setActiveFileID(fileID);
  };

  const tabClose = (fileID: string) => {
    //remove this current id from openedFilesIDs
    const tabsWithout = openedFileIDs.filter((id) => id != fileID);
    setOpenFileIDs(tabsWithout);
    //set the active to the first opened tab if still tabs left
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0]);
    } else {
      setActiveFileID('');
    }
  };
  const fileChange = (id: string, value: string) => {
    //loop through file array to update to new value
    const newFile = { ...files[id], body: value };
    setFiles({ ...files, [id]: newFile });

    //update the unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };

  const deleteFile = (id: string) => {
    if (files[id].isNew) {
      const { [id]: value, ...afterDelete } = files;
      setFiles(afterDelete);
    } else {
      fileHelper.deleteFile(join(files[id].path)).then(() => {
        //  filter out the current file id
        const { [id]: value, ...afterDelete } = files;
        setFiles(afterDelete);
        saveFilesToStore(files);
        //close the tab if opened
        tabClose(id);
      });
    }
  };

  const updateFileName = (id: string, title: string, isNew: boolean) => {
    //newPath should be different based on isNew
    //if isNew is false, path should be old dirname + new title
    const newPath = isNew
      ? join(savedLocation, `${title}.md`)
      : join(dirname(files[id].path), `${title}.md`);
    //loop through files, and update the title
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath };

    const newFiles = { ...files, [id]: modifiedFile };

    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles);
        saveFilesToStore(newFiles);
      });
    } else {
      const oldPath = files[id].path;
      fileHelper.renameFile(oldPath, newPath).then(() => {
        setFiles(newFiles);
        saveFilesToStore(newFiles);
      });
    }
  };

  const fileSearch = (keyword: string) => {
    //filter out the new files based on the keyword
    const newFiles = filesArr.filter((file) => file.title.includes(keyword));
    setSearchedFiles(newFiles);
  };

  const createNewFile = () => {
    const newID = uuidv4();
    const newFile = {
      id: newID,
      title: '',
      body: '## Please type in Markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    };
    setFiles({ ...files, [newID]: newFile });
  };

  const saveCurrentFile = () => {
    fileHelper.writeFile(activeFile.path, activeFile.body).then(() => {
      setUnsavedFileIDs(unsavedFileIDs.filter((id) => id !== activeFile.id));
    });
  };

  const importFiles = () => {
    remote.dialog
      .showOpenDialog({
        title: 'Choose a markdown files to import',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Markdown files', extensions: ['md'] }],
      })
      .then((result: any) => {
        if (Array.isArray(result.filePaths)) {
          const { filePaths: paths } = result;

          //filter out the path we already have in electron store
          const filteredPath = paths.filter((path: string) => {
            const alreadyAdded = Object.values(files).find((file) => {
              //@ts-ignore
              return file.path === path;
            });
            return !alreadyAdded;
          });

          //extend the path array to an array contains files info
          const importFilesArr = filteredPath.map((path: string) => {
            return {
              id: uuidv4(),
              title: basename(path, extname(path)),
              path,
            };
          });

          // get the new files object in flattenArr
          const newFiles = { ...files, ...flattenArr(importFilesArr) };
          // setState and update electron store
          setFiles(newFiles);
          saveFilesToStore(newFiles);
          if (importFilesArr.length > 0) {
            remote.dialog.showMessageBox({
              type: 'info',
              title: `${importFilesArr.length} files are successfully imported `,
              message: `${importFilesArr.length} files are successfully imported `,
            });
          }
        }
      });
  };

  useIpcRenderer({
    'create-new-file': createNewFile,
    'import-file': importFiles,
    'save-edit-file': saveCurrentFile,
  });

  return (
    <div className="Hello container-fluid px-0">
      <div className="row g-0">
        <div className="col-3  left-panel">
          <FileSearch title={'My Cloud Files'} onFileSearch={fileSearch} />
          <FileList
            files={searchedFiles.length > 0 ? searchedFiles : filesArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row g-0 button-group">
            <div className="col">
              <BottomBtn
                text="Create"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={importFiles}
              />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          {!activeFile && (
            <div className="start-page">
              Select or create a new Markdown file
            </div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                onTabClick={tabClick}
                activeId={activeFileID}
                onCloseTab={tabClose}
                unsavedIds={unsavedFileIDs}
              />
              <SimpleMde
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => fileChange(activeFile.id, value)}
                options={{ minHeight: '515px', autofocus: true }}
              />

              <div
                style={{
                  //width: '200px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <span style={{ width: '100px' }}>
                  <BottomBtn
                    text="Save"
                    colorClass="btn-info"
                    icon={faSave}
                    onBtnClick={saveCurrentFile}
                  />{' '}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
