import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import useKeyPress from '../hooks/useKeyPress';
import { useContextMenu } from '../hooks/useContextMenu';
import { getParentNode } from '../utils/helper';

//load nodejs modules
const remote = window.require('@electron/remote');
const { Menu, MenuItem } = remote;

export interface IFile {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  isNew: boolean;
}
interface IProps {
  files: IFile[];
  onFileClick: (id: string) => void;
  onSaveEdit: (id: string, value: string, isNew: boolean) => void;
  onFileDelete: (id: string) => void;
}

export const FileList = (props: IProps) => {
  const { files, onFileClick, onSaveEdit, onFileDelete } = props;

  const [editStatus, setEditStatus] = useState<string | null>(null);

  const [value, setValue] = useState<string>('');

  const enterPressed = useKeyPress('Enter');
  const escPressed = useKeyPress('Escape');

  //auto focus when selecting a tab to edit
  let node = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editStatus) {
      node.current?.focus();
    }
  }, [editStatus]);
  const closeSearch = (editItem: IFile) => {
    setEditStatus(null);
    setValue('');
    //if we are editing a newly created file,we should delete this file when pressing esc
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };

  const clickItem = useContextMenu(
    [
      {
        label: 'open',
        click: () => {
          const parentElement = getParentNode(clickItem.current, 'file-item');
          if (parentElement) {
            onFileClick(parentElement.dataset.id);
          }
        },
      },
      {
        label: 'rename',
        click: () => {
          const parentElement = getParentNode(clickItem.current, 'file-item');
          if (parentElement) {
            setEditStatus(parentElement.dataset.id);
          }
        },
      },
      {
        label: 'delete',
        click: () => {
          const parentElement = getParentNode(clickItem.current, 'file-item');
          if (parentElement) {
            onFileDelete(parentElement.dataset.id);
          }
        },
      },
    ],
    '.file-list',
    [files],
  );

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus != null && value.trim() != '') {
      onSaveEdit(editItem!.id, value, editItem!.isNew);
      setEditStatus(null);
      setValue('');
    }

    if (escPressed && editStatus != null) {
      closeSearch(editItem!);
    }
  });

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          key={file.id}
          className="list-group-item bg-light d-flex  align-items-center file-item"
          data-id={file.id}
          data-title={file.title}
        >
          {file.id != editStatus && !file.isNew && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-8 c-link"
                onClick={() => {
                  onFileClick(file.id);
                }}
              >
                {file.title}
              </span>
            </>
          )}

          {(file.id === editStatus || file.isNew) && (
            <>
              <div className="col-10">
                <input
                  type="text"
                  ref={node}
                  className="form-control"
                  placeholder="Please input file name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => closeSearch(file)}
                >
                  <FontAwesomeIcon size="1x" title="Close" icon={faTimes} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
