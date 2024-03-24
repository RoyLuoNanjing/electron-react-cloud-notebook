const fs = require('fs').promises;
const path = require('path');

const fileHelper = {
  readFile: (path) => {
    //@ts-ignore
    return fs.readFile(path, { encoding: 'utf8' });
  },
  writeFile: (path, content) => {
    //@ts-ignore
    return fs.writeFile(path, content, { encoding: 'utf8' });
  },
  renameFile : (path, newPath)=>{
    return fs.rename(path, newPath)
  },

  deleteFile : (path)=>{
    return fs.unlink(path)
  }
};
const testPath = path.join(__dirname, 'helper.js');
const testWritePath = path.join(__dirname, 'hello.md');
const renamePath = path.join(__dirname, 'rename.md');


// fileHelper.readFile(testPath).then((data) => {
//   console.log(data);
// });

// fileHelper.writeFile(testWritePath, '## hello world').then(() => {
//   console.log('write in successfully');
// });

// fileHelper.renameFile(testWritePath, renamePath).then(() => {
//   console.log('rename successfully');
// });

fileHelper.deleteFile( renamePath).then(() => {
  console.log('delete successfully');
});
