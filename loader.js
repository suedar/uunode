const fs = require("fs");
const util = require('util');
const path = require('path');
const { exec } = require("child_process");

const rmdir = util.promisify(fs.rmdirSync);
const menuName = '.uunode';
const rootPath = process.cwd();

const deleteMenu = async () => {
  rmdir(path.resolve(rootPath, menuName), {recursive: true});
}

const removeCurrentLink = (filePath) => {
  return filePath.replace(/\.\//, "");
}

const handleFilePath = (filePath) => {
  if (!/js|mjs/.test(filePath)) { // 仅对该两种文件进行处理
    return filePath;
  }
  // filePath = removeCurrentLink(filePath);

  return filePath.replace(/.+\//, "");
}

const transJsToMjs = (data, filePaths, filePath) => {
  const importReg = /^import.*'|"$/mg;
  const newData = data.replace(importReg, (str) => {
    if (!/from/.test(str)) {
      // TODO: 转为采用 deno 执行
      throw new Error(`
        Not Support Module Import Directly.
      `);
    }
    const strArr = str.split(/'|"/);
    const module = strArr[1];

    if (/js|mjs/.test(module)) { // 填充文件
      const pathArr = filePath.split('/');
      pathArr.pop();
      pathArr.push(module);
      filePaths.push(pathArr.join('/'));
    }

    if (/js/.test(module)) {
      return [strArr[0], `"./${handleFilePath(module.slice(0, -2) + 'mjs')}"`, strArr[2]].join('');
    }
    return str;
  });
  return newData;
}

const createFile = (filePath) => {
  const filePaths = [];
  const data = transJsToMjs(fs.readFileSync(filePath, "utf-8"), filePaths, filePath);

  const filePathArr = filePath.split("/").reverse();
  const filePathArrLastPath = filePathArr.shift();
  const actualPath = /js/.test(filePathArrLastPath) ? filePathArrLastPath.slice(0, -2) + 'mjs' : filePathArrLastPath;

  fs.mkdirSync(menuName, { recursive: true });
  fs.writeFileSync(path.resolve(rootPath, menuName, handleFilePath(actualPath)), data, { recursive: true });

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

  exec(`node ${path.resolve(rootPath, menuName, renderPath)}`, (err, stdout, stderr) => {
    !argv.s && console.log(stdout);
    !argv.k && deleteMenu();
  });
};

module.exports = run;