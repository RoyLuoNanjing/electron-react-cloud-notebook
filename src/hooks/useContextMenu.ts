import { useEffect, useRef } from 'react';

type IMenuItem = {
  label: string;
  click: () => void;
};

//load nodejs modules
const remote = window.require('@electron/remote');
const { Menu, MenuItem } = remote;

export const useContextMenu = (
  itemArr: IMenuItem[],
  targetSelector: string,
) => {
  let clickedElement = useRef(null);

  useEffect(() => {
    const menu = new Menu();
    itemArr.forEach((item) => {
      menu.append(new MenuItem(item));
    });

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      //only show the context menu on current dom element or targetSelector contains target
      //@ts-ignore
      if (document.querySelector(targetSelector).contains(e.target)) {
        //@ts-ignore
        clickedElement.current = e.target;
        menu.popup({
          window: remote.getCurrentWindow(),
        });
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return clickedElement;
};
