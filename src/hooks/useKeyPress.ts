import { useState, useEffect } from 'react';

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  type KeyEvent = {
    key: string;
  };
  const keyDownHandler = ({ key }: KeyEvent) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const keyUpHandler = ({ key }: KeyEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
