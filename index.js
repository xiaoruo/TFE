#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var Filecopy = require('./lib/filecopy');
var Http = require('./lib/http');
var program = require('commander');
var inquirer = require('inquirer');
require('colors');
var format = require('eslint/lib/cli-engine');
var init = require('eslint/lib/config/config-initializer');
var eslintCli = require('eslint/lib/cli');

program
  .command('init')
  .description('初始化项目')
  .action(function() {
    inquirer.prompt([{
      type: 'confirm',
      name: 'jQuery',
      message: '是否需要引入jQuery库?',
      default: true
    }, {
      type: 'confirm',
      name: 'bootStrap',
      message: '是否使用Bootstrap框架?',
      default: true
    }, {
      type: 'confirm',
      name: 'font',
      message: '是否需要引入webfont?',
      default: false
    }, {
      type: 'list',
      name: 'style',
      message: '样式书写使用语言',
      default: 'less',
      choices: [{
        name: 'css',
        value: 'css'
      }, {
        name: 'less',
        value: 'less'
      }, {
        name: 'sass',
        value: 'sass'
      }]
    }], function(answers) {
      // 1.
      var nowPath = process.cwd();
      var filePath = __dirname;
      new Filecopy(filePath + '/mod', nowPath);
      console.log('项目初始化成功'.green);
      var nowPath = process.cwd();
      var filePath = __dirname;
      var addP = setInterval(function() {
        fs.exists(filePath + '/mod/p/demos', function(exists) {
          if (exists) {
            fs.rename(nowPath + '/p/demos', nowPath + '/p/demo', function(err) {
              if (err) {} else {
                clearInterval(addP);
              }
            });
          }
        });
      }, 10);
      var addC = setInterval(function() {
        fs.exists(filePath + '/mod/c/module-demos', function(exists) {
          if (exists) {
            fs.rename(nowPath + '/c/module-demos', nowPath + '/c/module-demo', function(err) {
              if (err) {} else {
                clearInterval(addC);
              }
            });
          }
        });
      }, 10);
      var config = nowPath + '/config.json';
      var addN = setInterval(function() {
        fs.writeFile(config, JSON.stringify(answers), function(err) {
          if (err) {
            console.log("fail " + err);
          } else {
            clearInterval(addN);
          }
        });
      }, 10);
      var deleteN = setTimeout(function() {
        var html = nowPath + '/page/index.html';
        if (answers.style === 'css') {
          fs.unlink(nowPath + '/c/module-demo/index.less');
          fs.unlink(nowPath + '/c/module-demo/index.sass');
          fs.unlink(nowPath + '/p/demo/index.less');
          fs.unlink(nowPath + '/p/demo/index.sass');
        } else if (answers.style === 'less') {
          // fs.unlink(nowPath + '/c/module-demo/index.css');
          fs.unlink(nowPath + '/c/module-demo/index.sass');
          // fs.unlink(nowPath + '/p/demo/index.css');
          fs.unlink(nowPath + '/p/demo/index.sass');
        } else {
          fs.unlink(nowPath + '/c/module-demo/index.less');
          // fs.unlink(nowPath + '/c/module-demo/index.css');
          fs.unlink(nowPath + '/p/demo/index.less');
          // fs.unlink(nowPath + '/p/demo/index.css');
        }
      }, 100);
    });
  });

program
  .command('add [env1] [env2]')
  .description('创建模块')
  .action(function(env1, env2) {
    if (env1 === 'p') {
      var nowPath = process.cwd();
      var filePath = __dirname;
      new Filecopy(filePath + '/mod/p', nowPath + '/p');
      var addP = setInterval(function() {
        fs.exists(filePath + '/mod/p/demos', function(exists) {
          if (exists) {
            fs.rename(nowPath + '/p/demos', nowPath + '/p/' + env2, function(err) {
              if (err) {
                console.log("文件创建中......".green);
              } else {
                clearInterval(addP);
                console.log('"%s"模块创建成功'.green, env2);
              }
            });
          }
        });
      }, 10);
      var answers = JSON.parse(fs.readFileSync(nowPath + '/config.json'));
      var deleteN = setTimeout(function() {
        var html = nowPath + '/page/index.html';
        if (answers.style === 'css') {
          fs.unlink(nowPath + '/p/' + env2 + '/index.less');
          fs.unlink(nowPath + '/p/' + env2 + '/index.sass');
        } else if (answers.style === 'less') {
          // fs.unlink(nowPath + '/p/' + env2 + '/index.css');
          fs.unlink(nowPath + '/p/' + env2 + '/index.sass');
        } else {
          fs.unlink(nowPath + '/p/' + env2 + '/index.less');
          // fs.unlink(nowPath + '/p/' + env2 + '/index.css');
        }
      }, 100);
    } else if (env1 === 'c') {
      var nowPath = process.cwd();
      var filePath = __dirname;
      new Filecopy(filePath + '/mod/c', nowPath + '/c');

      var addC = setInterval(function() {
        fs.exists(filePath + '/mod/c/module-demos', function(exists) {
          if (exists) {
            fs.rename(nowPath + '/c/module-demos', nowPath + '/c/' + env2, function(err) {
              if (err) {
                console.log("文件创建中......".green);
              } else {
                clearInterval(addC);
                console.log('"%s"模块创建成功'.green, env2);
              }
            });
          }
        });
      }, 10);
      var answers = JSON.parse(fs.readFileSync(nowPath + '/config.json'));
      var deleteN = setTimeout(function() {
        var html = nowPath + '/page/index.html';
        if (answers.style === 'css') {
          fs.unlink(nowPath + '/c/' + env2 + '/index.less');
          fs.unlink(nowPath + '/c/' + env2 + '/index.sass');
        } else if (answers.style === 'less') {
          // fs.unlink(nowPath + '/c/' + env2 + '/index.css');
          fs.unlink(nowPath + '/c/' + env2 + '/index.sass');
        } else {
          fs.unlink(nowPath + '/c/' + env2 + '/index.less');
          // fs.unlink(nowPath + '/c/' + env2 + '/index.css');
        }
      }, 100);
    } else {
      console.log('命令行参数不正确'.red);
    }
  });

program
  .command('lint [env]')
  .description('代码检查')
  .action(function(env) {
    if (env === 'check') {
      fs.exists('.eslintrc.js', function(exists) {
        if (exists === false) {
          init.initializeConfig();
        }
      });
      var filesList = readAllFile(process.cwd());
      for (var i = 0, len = filesList.length; i < len; i++) {
        eslintCli.execute(filesList[i]);
      }
    } else if (env === 'format') {
      format.getFormatter();
      console.log('代码格式化完成!'.green);
    }
  });

program
  .command('dev')
  .description('开启服务器')
  .action(function(env) {
    new Http();
  });

program.parse(process.argv);

function readAllFile(root, reg) {

  var resultArr = [];
  var thisFn = arguments.callee;
  if (fs.existsSync(root)) { //文件或文件夹存在9

    var stat = fs.lstatSync(root); // 对于不存在的文件或文件夹，此函数会报错

    if (stat.isDirectory()) { // 文件夹
      var files = fs.readdirSync(root);
      files.forEach(function(file) {
        var t = thisFn(root + '/' + file, reg);
        resultArr = resultArr.concat(t);
      });

    } else {
      if (reg !== undefined) {

        if (typeof reg.test == 'function' && reg.test(root)) {
          resultArr.push(root);
        }
      } else {
        resultArr.push(root);
      }
    }
  }

  return resultArr;
}