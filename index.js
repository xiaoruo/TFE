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
      console.log(filePath);
      new Filecopy(filePath + '/mod', nowPath);
      // exists('./src', './build', copy);
      /*var fileName = "index.js";
      var sourceFile = path.join(__dirname, fileName);
      var destPath = path.join(__dirname, "dest", fileName);
      var readStream = fs.createReadStream(sourceFile);
      var writeStream = fs.createWriteStream(destPath);
      console.log(sourceFile);
      console.log(destPath);*/
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
      console.log('创建"%s"模块', env2);
      console.log('"%s"模块创建成功'.green, env2);
    } else if (env1 === 'c') {
      console.log('创建c模块');
      console.log('"%s"模块创建成功'.green, env2);
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
/*
walk('/dirName');
// eslintCli.execute(results);
console.log(fileList); */
/*
Option(): 初始化自定义参数对象，设置“关键字”和“描述”
Command(): 初始化命令行参数对象，直接获得命令行输入
Command#command(): 定义一个命令名字
Command#action(): 注册一个callback函数
Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
Command#parse(): 解析命令行参数argv
Command#description(): 设置description值
Command#usage(): 设置usage值
 */