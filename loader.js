const fs = require('fs');
const util = require('util');
const rmdir = util.promisify(fs.rmdir);

const deleteMenu = async () => {
  await rmdir('./.unode', { recursive: true });
};

const createFile = (filePath) => {
  let data = fs.readFileSync(filePath, 'utf-8');

  const importReg = /^import.*'|"$/gm;

  data = data.replace(importReg, (str) => {
    if (!/from/.test(str)) {
      // TODO: 转为采用 deno 执行
      // throw new Error(`
      //   Unable to resolve module.
      //   Please check the code at ${filePath}
      // `);
    }
    const strArr = str.split(/import|from/);
    const newArr = [
      'const ',
      strArr[1].trim(),
      ' = require(',
      strArr[2].trim(),
      ')',
      ';',
    ];
    return newArr.join('');
  });

  console.log(data);
};

/**
 * main file
 * @param {string} filePath
 */
const run = async (filePath) => {
  if (filePath === undefined) {
    throw new Error(
      `Unable to resolve filePath, please input correct filePath.`
    );
  }

  deleteMenu();
  createFile(filePath);

  // console.log(data);
  // console.log("READ FILE SYNC END");
};

module.exports = run;
