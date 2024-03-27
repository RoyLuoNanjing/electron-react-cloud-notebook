import { defaultApp } from 'process';
import { useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

interface IRenderedObj {
  [key: string]: () => void;
}

const useIpcRenderer = (keyCallbackMap: IRenderedObj) => {
  useEffect(() => {
    Object.keys(keyCallbackMap).forEach((key) => {
      ipcRenderer.on(key, keyCallbackMap[key]);
    });
    return () => {
      Object.keys(keyCallbackMap).forEach((key) => {
        ipcRenderer.removeListener(key, keyCallbackMap[key]);
      });
    };
  });
};

export default useIpcRenderer;
