#! /usr/bin/env node

const path = require('path');
const run = require('./loader.js');
const chalk = require("chalk");

const main = () => {
  const argv = require('yargs-parser')(process.argv.slice(2))

  if (!Array.isArray(argv._) || argv._.length === 0) {
    console.log(chalk.red("Error Occurred: Please Input FilePath"));
    return;
  }

  run(path.resolve(__dirname, argv._[0]), argv);
};

main();
