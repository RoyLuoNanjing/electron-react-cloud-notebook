import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { FileSearch } from '../components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileList, IFile } from '../components/FileList';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons';

import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import defaultFiles from '../utils/defaultFiles';
import { BottomBtn } from '../components/BottomBtn';
import { TabList } from '../components/TabList';
import { useState } from 'react';

function Hello() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenFileIDs] = useState<string[]>([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState<string[]>([]);

  const openedFiles = openedFileIDs
    .map((openID) => files.find((file) => file.id === openID))
    .filter((file) => file !== undefined) as IFile[];

  const fileClick = (fileID: string) => {
    //set current active file
    setActiveFileID(fileID);
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
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.body = value;
      }
      return file;
    });
    setFiles(newFiles);

    //update the unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };
  const activeFile = files.find((file) => file.id === activeFileID);

  return (
    <div className="Hello container-fluid px-0">
      <div className="row g-0">
        <div className="col-3  left-panel">
          <FileSearch
            title={'My Cloud Files'}
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={files}
            onFileClick={fileClick}
            onFileDelete={(id) => {
              console.log(id);
            }}
            onSaveEdit={(id, newValue) => {
              console.log(newValue);
            }}
          />
          <div className="row g-0 button-group">
            <div className="col">
              <BottomBtn text="Create" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon={faFileImport}
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
