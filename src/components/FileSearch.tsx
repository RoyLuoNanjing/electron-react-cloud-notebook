import { title } from 'process';
import React, { useState } from 'react';

interface IProps {
  title: string;
  onFileSearch: () => void;
}

export const FileSearch = (props: IProps) => {
  const { title, onFileSearch } = props;
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  return (
    <div className="alert alert-primary">
      {!inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setInputActive(true)}
          >
            Search
          </button>
        </div>
      )}
      {inputActive && (
        <div className="d-flex">
          <input
            className="form-control me-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setInputActive(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
