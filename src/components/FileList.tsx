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
          className="list-group-item bg-light d-flex align-items-center file-item"
        >
          <span>{file.title}</span>
        </li>
      ))}
    </ul>
  );
};
