var fs = require('fs'),
    stat = fs.stat;

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */

function Filecopy(src, dst) {
    console.log(src + "    " + dst)
    this.exists(src, dst, this.copy);
}

Filecopy.prototype.copy = function(src, dst) {
    // 读取目录中的所有文件/目录
    var that = this;
    fs.readdir(src, function(err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function(path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            stat(_src, function(err, st) {
                if (err) {
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    Filecopy.prototype.exists(_src, _dst, Filecopy.prototype.copy);
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
Filecopy.prototype.exists = function(src, dst, callback) {
    fs.exists(dst, function(exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function() {
                callback(src, dst);
            });
        }
    });
};

module.exports = Filecopy;