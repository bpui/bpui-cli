#!/usr/bin/env node

'use strict';

var febs = require('febs');
var List = require('term-list');
var path = require('path');
var init = require('./init');
var version = require('./version');
var pack = require('../package.json');
var utils = require('./utils');
var chalk = require('chalk');
var fs = require('fs');

var commands = {
  'version': [version, 'Version'],
  'init': [init, 'Initial project'],
}

var LASTUPDATE_STEP = 1000 * 60 * 60 * 10;
var LASTUPDATE_FILE = path.join(__dirname, 'lastupdate');
var lastupdate = (new Date().getTime() - LASTUPDATE_STEP).toString();

if (febs.file.fileIsExist(LASTUPDATE_FILE)) {
  lastupdate = fs.readFileSync(LASTUPDATE_FILE, 'utf8');
}

function checkoutVersion(cbFinish) {
  febs.utils.execCommand((process.platform === 'win32'? 'npm.cmd': 'npm'), ['view', 'bpui-cli', 'version', '--json'], (err, stdout, stderr) => {
    if (err) {
    
      console.error(err);

      if ('n' == utils.question(chalk.red('[Error] checkout latest version! continue? (Y/n)'), (answer) => {
        return answer == 'Y' || answer == 'n';
      })) {
        process.exit(0);
      } else {
        stdout = '"' + febs.string.trim(pack.version) + '"';
      }
    }
    
    if (febs.string.trim(stdout) != '"' + febs.string.trim(pack.version) + '"') {
      console.log('[New version available] To run: ' + chalk.green('npm i bpui-cli@latest -g') + ' in terminal');
      process.exit(0);
      // if ('Y' == utils.question('[Warn] upgrade now? (Y/n)', (answer) => {
      //   return answer == 'Y' || answer == 'n';
      // })) {
      //   console.log("upgrading...")
      //   febs.utils.execCommand("npm", ["i", "bpui-cli@latest", "-g"], (err, stdout, stderr) => {
      //     if (err) {
      //       console.error(stderr);
      //     }
      //     else {
      //       console.log(stdout);
      //     }
      //     process.exit(0);
      //   });
      // }
      // else {
      //   cbFinish();
      // }
    }
    else {
      cbFinish();
    }
  });
}

function runDo() {
  var args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
  }

  var command = commands[args[0]];
  if (!command) {
    console.error('Command `%s` unrecognized', args[0]);
    printUsage();
    return;
  }

  command[0].done(args);
}

/**
 * Parses the command line and runs a command of the CLI.
 */
function run() {

  let step = new Date().getTime() - Number(lastupdate);
  if (Number.isInteger(step) && step < LASTUPDATE_STEP) {
    runDo();
  }
  else {
    fs.writeFileSync(LASTUPDATE_FILE, new Date().getTime().toString());
    checkoutVersion(runDo);
  }
}

function printUsage() {
  console.log([
    'Usage: bpui <command>',
    '',
    'Commands:'
  ].concat(Object.keys(commands).map(function(name) {
    return '  - ' + name + ': ' + commands[name][1];
  })).join('\n'));
  process.exit(1);
}

if (require.main === module) {
  run();
}

module.exports = {
  run: run,
};
