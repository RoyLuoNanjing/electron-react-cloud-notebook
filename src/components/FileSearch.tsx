import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useKeyPress from '../hooks/useKeyPress';
interface IProps {
  title: string;
  onFileSearch: (value: string) => void;
}

export const FileSearch = (props: IProps) => {
  const { title, onFileSearch } = props;
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const enterPressed = useKeyPress('Enter');
  const escPressed = useKeyPress('Escape');

  const closeSearch = () => {
    setInputActive(false);
    setValue('');
  };
  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }

    if (escPressed && inputActive) {
      closeSearch();
    }
  });

  let node = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputActive) {
      node.current?.focus();
    }
  }, [inputActive]);

  return (
    <div className="alert alert-primary">
      {!inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon size={'2x'} title="Search" icon={faSearch} />
          </button>
        </div>
      )}
      {inputActive && (
        <div className="d-flex">
          <input
            className="form-control me-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={node}
          />
          <button type="button" className="icon-button" onClick={closeSearch}>
            <FontAwesomeIcon size={'2x'} title="Close" icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  );
};
