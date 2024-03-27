const { app, shell, ipcMain } = require('electron');
const Store = require('electron-store');

const settingsStore = new Store({ name: 'Settings' });
let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'CmdOrCtrl+N',
        //@ts-ignore
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send('create-new-file');
        },
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        //@ts-ignore
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send('save-edit-file');
        },
      },
      {
        label: 'Search',
        accelerator: 'CmdOrCtrl+F',
        //@ts-ignore
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send('search-file');
        },
      },
      {
        label: 'Import',
        accelerator: 'CmdOrCtrl+O',
        //@ts-ignore
        click: (menuItem, browserWindow, event) => {
          browserWindow.webContents.send('import-file');
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall',
      },
    ],
  },
  // {
  //   label: '云同步',
  //   submenu: [{
  //     label: '设置',
  //     accelerator: 'CmdOrCtrl+,',
  //     click: () => {
  //       ipcMain.emit('open-settings-window')
  //     }
  //   }, {
  //     label: '自动同步',
  //     type: 'checkbox',
  //     enabled: qiniuIsConfiged,
  //     checked: enableAutoSync,
  //     click: () => {
  //       settingsStore.set('enableAutoSync', !enableAutoSync)
  //     }
  //   }, {
  //     label: '全部同步至云端',
  //     enabled: qiniuIsConfiged,
  //     click: () => {
  //       ipcMain.emit('upload-all-to-qiniu')
  //     }
  //   }, {
  //     label: '从云端下载到本地',
  //     enabled: qiniuIsConfiged,
  //     click: () => {

  //     }
  //   }]
  // },
  {
    label: 'View',
    submenu: [
      {
        label: 'Refresh',
        accelerator: 'CmdOrCtrl+R',
        //@ts-ignore
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: 'Full Screen',
        accelerator: (() => {
          if (process.platform === 'darwin') return 'Ctrl+Command+F';
          else return 'F11';
        })(),
        //@ts-ignore
        click: (item, focusedWindow) => {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: 'Development Tools',
        accelerator: (function () {
          if (process.platform === 'darwin') return 'Alt+Command+I';
          else return 'Ctrl+Shift+I';
        })(),
        //@ts-ignore
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.toggleDevTools();
        },
      },
    ],
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => {
          shell.openExternal('http://electron.atom.io');
        },
      },
    ],
  },
];

/* For Mac system */
// if (process.platform === 'darwin') {
//   const name = app.getName()
//   template.unshift({
//     label: name,
//     submenu: [{
//       label: `关于 ${name}`,
//       role: 'about'
//     }, {
//       type: 'separator'
//     }, {
//       label: '设置',
//       accelerator: 'Command+,',
//       click: () => {
//         ipcMain.emit('open-settings-window')
//       }
//     }, {
//       label: '服务',
//       role: 'services',
//       submenu: []
//     }, {
//       type: 'separator'
//     }, {
//       label: `隐藏 ${name}`,
//       accelerator: 'Command+H',
//       role: 'hide'
//     }, {
//       label: '隐藏其它',
//       accelerator: 'Command+Alt+H',
//       role: 'hideothers'
//     }, {
//       label: '显示全部',
//       role: 'unhide'
//     }, {
//       type: 'separator'
//     }, {
//       label: '退出',
//       accelerator: 'Command+Q',
//       click: () => {
//         app.quit()
//       }
//     }]
//   })
// } else {
//   template[0].submenu.push({
//     label: '设置',
//     accelerator: 'Ctrl+,',
//     click: () => {
//       ipcMain.emit('open-settings-window')
//     }
//   })
// }

module.exports = template;
