const fs = require('fs');
const path = require('path');

const fileHelper = {
  readFile: (path: string, cb: any) => {
    //@ts-ignore
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (!err) {
        cb(data);
      }
    });
  },
  writeFile: (path: string, content: any, cb: any) => {
    //@ts-ignore
    fs.writeFile(path, content, { encoding: 'utf8' }, (err) => {
      if (!err) {
        cb();
      }
    });
  },
};
const testPath = path.join(__dirname, 'helper.js');
const testWritePath = path.join(__dirname, 'helper.js');

fileHelper.readFile(testPath, (data: any) => {
  console.log(data);
});

fileHelper.writeFile(testWritePath, '## hello world', (data: any) => {
  console.log('write in successfully');
});
