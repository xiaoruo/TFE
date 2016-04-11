#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var Filecopy = require('./lib/filecopy');
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
      default: 'Yes'
    }, {
      type: 'confirm',
      name: 'bootStrap',
      message: '是否使用Bootstrap框架?',
      default: 'Yes'
    }, {
      type: 'confirm',
      name: 'font',
      message: '是否需要引入webfont?',
      default: 'No'
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
      if (answers.jQuery === true) {

      }
      if (answers.bootStrap === true) {

      }
      if (answers.font === true) {

      }
      if (answers.style === 'css') {

      } else if (answers.style === 'less') {

      } else if (answers.style === 'sass') {

      } else {
        console.log('样式设置error'.red);
      }
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
          console.log('代码检查模块初始化完成！'.green);
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

  });

program.parse(process.argv);

function readAllFile(root, reg) {

  var resultArr = [];
  var thisFn = arguments.callee;
  if (fs.existsSync(root)) { //文件或文件夹存在

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