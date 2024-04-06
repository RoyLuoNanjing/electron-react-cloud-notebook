import { BrowserWindow } from 'electron';
import App from './renderer/App';

class AppWindow extends BrowserWindow {
  constructor(config: any, urlLocation: any) {
    const basicConfig = {
      show: false,
      width: 1024,
      height: 728,
      backgroundColor: '#efefef',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    };

    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    this.loadURL(urlLocation);
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

module.exports = AppWindow;
