import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import useKeyPress from '../hooks/useKeyPress';

export interface IFile {
  id: string;
  title: string;
}
interface IProps {
  files: IFile[];
  onFileClick: (id: string) => void;
  onSaveEdit: (id: string, value: string) => void;
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
  const closeSearch = () => {
    setEditStatus(null);
    setValue('');
  };

  useEffect(() => {
    if (enterPressed && editStatus != null) {
      const editItem = files.find((file) => file.id === editStatus);
      onSaveEdit(editItem!.id, value);
      setEditStatus(null);
      setValue('');
    }

    if (escPressed && editStatus != null) {
      closeSearch();
    }
  });
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          key={file.id}
          className="list-group-item bg-light d-flex  align-items-center file-item"
        >
          {file.id != editStatus && (
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
              <button
                type="button"
                className="icon-button col-1"
                onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title);
                }}
              >
                <FontAwesomeIcon size={'1x'} title="Edit" icon={faEdit} />
              </button>
              <button
                type="button"
                className="icon-button col-1"
                onClick={() => {
                  onFileDelete(file.id);
                }}
              >
                <FontAwesomeIcon size={'1x'} title="Delete" icon={faTrash} />
              </button>
            </>
          )}

          {file.id === editStatus && (
            <>
              <div className="col-10">
                <input
                  type="text"
                  ref={node}
                  className="form-control"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={closeSearch}
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
