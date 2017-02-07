/**
 * 名称：网页截图工具
 * 日期：2017-01-07
 * 描述：无
 */

//引入依赖>>
var path = require('path')
var spawn = require('child_process').spawn;
var phantomjs = require('phantomjs');
var dantejs = require('dantejs');

//变量
var binPath = phantomjs.path;
var Promise = dantejs.Promise;
var defaultOptions = {
    width: 1920,
    height: 1080,
    quality: .8,
    format: 'png'
}

/**
 * 截图工具构造函数
 */
function Snapshot() {

}

/**
 * 截取指定url的网页图片
 * @param url 网页url地址  例如: https://www.lianshang.com
 * @param file 要保存的文件路径 例如: c:\captures\a.png
 * @param options 截屏配置参数 例如: {width:1920,height:1080}
 */
Snapshot.prototype.capture = function(url, file, options) {
    options = options || defaultOptions;
    return new Promise(function(resolve, reject) {
        var cp = spawn(binPath, [path.resolve('phantomjs/capture.js'), url, file, JSON.stringify(options)]);
        var error = null;
        var output = [];
        cp.on('error', function(err) {
            error = err;
        })
        cp.stdout.on('data', function(data) {
            output.push(data);
        });
        cp.on('close', function(code) {
            error ? reject(error) : resolve(JSON.parse(output.join('')));
        });
        process.on('SIGTERM', function() {
            cp.kill('SIGTERM')
            process.exit(1)
        })
    });
}

module.exports = new Snapshot();