import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';

interface IFile {
  id: string;
  title: string;
}
interface IProps {
  files: IFile[];
  onFileClick?: () => void;
  onSaveEdit?: () => void;
  onFileDelete?: () => void;
}
export const FileList = (props: IProps) => {
  const { files, onFileClick, onSaveEdit, onFileDelete } = props;
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          key={file.id}
          className="list-group-item bg-light d-flex row align-items-center file-item"
        >
          <span className="col-2">
            <FontAwesomeIcon size="lg" icon={faMarkdown} />
          </span>
          <span className="col-8">{file.title}</span>
          <button
            type="button"
            className="icon-button col-1"
            onClick={() => {}}
          >
            <FontAwesomeIcon size={'1x'} title="Edit" icon={faEdit} />
          </button>
          <button
            type="button"
            className="icon-button col-1"
            onClick={() => {}}
          >
            <FontAwesomeIcon size={'1x'} title="Delete" icon={faTrash} />
          </button>
        </li>
      ))}
    </ul>
  );
};
