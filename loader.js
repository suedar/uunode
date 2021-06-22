const fs = require("fs");
const util = require('util');
const path = require('path');
const { exec } = require("child_process");

const rmdir = util.promisify(fs.rmdirSync);
const menuName = '.uunode';

const deleteMenu = async () => {
  rmdir(path.resolve(__dirname, menuName), {recursive: true});
}

const transJsToMjs = (data, filePaths, filePath) => {
  const importReg = /^import.*'|"$/mg;
  const newData = data.replace(importReg, (str) => {
    if (!/from/.test(str)) {
      // TODO: 转为采用 deno 执行
      throw new Error(`暂未支持模块直接引入`);
    }
    const strArr = str.split(/'|"/);
    const module = strArr[1];

    if (/js|mjs/.test(module)) {
      const pathArr = filePath.split('/');
      pathArr.pop();
      pathArr.push(module);
      filePaths.push(pathArr.join('/'));
    }
    if (/js/.test(module)) {
      return [strArr[0], `"${module.slice(0, -2)}mjs"`, strArr[2]].join('');
    }
    return str;
  });
  return newData;
}

const createFile = (filePath) => {
  const filePaths = [];
  let data = fs.readFileSync(filePath, "utf-8");
  data = transJsToMjs(data, filePaths, filePath);

  const pureFilePath = filePath.split("/").reverse()[0];
  let actualPath = pureFilePath;

  if (/js/.test(pureFilePath)) {
    actualPath = pureFilePath.slice(0, -2) + 'mjs';
  }
  fs.mkdirSync(menuName, {recursive: true});
  fs.writeFileSync(path.resolve(__dirname, menuName, actualPath), data);

  while (filePaths.length > 0) {
    const curPath = filePaths.shift();
    createFile(curPath);
  }

  return actualPath;
}

/**
 * main file
 * @param {string} filePath
 */
const run = async (filePath, argv) => {
  deleteMenu();
  const renderPath = createFile(filePath, menuName);

  exec(`node ${path.resolve(__dirname, menuName, renderPath)}`, (err, stdout, stderr) => {
    !argv.s && console.log(stdout);
    !argv.k && deleteMenu();
  });
};

module.exports = run;