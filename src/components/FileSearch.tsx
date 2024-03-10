import { useState, useEffect, useRef } from 'react';

interface IProps {
  title: string;
  onFileSearch: (value: string) => void;
}

export const FileSearch = (props: IProps) => {
  const { title, onFileSearch } = props;
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const closeSearch = (e: any) => {
    e.preventDefault();
    setInputActive(false);
    setValue('');
  };
  useEffect(() => {
    const handleInputEvent = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Enter' && inputActive) {
        onFileSearch(value);
      } else if (key === 'Escape' && inputActive) {
        closeSearch(event);
      }
    };
    document.addEventListener('keyup', handleInputEvent);
    return () => {
      document.removeEventListener('keyup', handleInputEvent);
    };
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
            ref={node}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={closeSearch}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
