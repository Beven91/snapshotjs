/**
 * 名称：截图工具
 * 日期：2017-02-06
 * 描述：简单截取指定网页的工具
 * 注意：此文件是使用phantomjs 执行的js文件
 */

//引入依赖>>
var WebPage = require('webpage');
var system = require('system');

/**
 * 截图工具构造函数
 */
function Capture() {
    var args = system.args;
    this.url = args[1];
    this.outfile = args[2];
    this.options = JSON.parse(args[3] || '{}');
    this.capture(this.url, this.outfile);
}

/**
 * 截取指定url的网页图片
 * @param url 网页url地址  例如: https://www.lianshang.com
 * @param file 要保存的文件路径 例如: c:\captures\a.png
 */
Capture.prototype.capture = function(url, file) {
    var page = WebPage.create();
    var options = this.options;
    page.viewportSize = {
        width: options.width || 1920,
        height: options.height || 1080
    }
    page.remoteUrl = url;
    page.open(url, onPageComplete(page, file, this.onPageComplete.bind(this)));
}

/**
 * 页面加载完毕
 * @param page {WebPage} 实例
 * @param file 存储文件
 */
Capture.prototype.onPageComplete = function(page, file) {
    var options = this.options;
    var clipRect = getBoundingClientRect(page, 'body');
    if (!clipRect) {
        throw new Error('Error: Can\'t find selector: ' + selector);
    }
    page.clipRect = {
        top: clipRect.top,
        left: clipRect.left,
        width: clipRect.width,
        height: clipRect.height
    };
    page.render(file, {
        quality: options.quality || 0.8,
        format: options.format || 'png'
    });
    console.log('saved file:' + file);
}

/**
 * 绑定页面完成事件
 * @param page {WebPage}  
 * @param file 保存路径
 * @param handler 回掉函数
 */
function onPageComplete(page, file, handler) {
    return function(status) {
        try {
            if (status !== 'success') {
                console.error("-----ERROR 页面:" + page.remoteUrl + "载入失败");
                page.close();
            } else {
                var readyState = page.evaluate(readyStateHandler);
                if ('complete' === readyState) {
                    handler(page, file);
                } else {
                    console.error('-----ERROR not complete:' + readyState);
                }
            }
            phantom.exit();
        } catch (ex) {
            page.close();
            console.error(ex);
            phantom.exit();
        }
    }
}

/**
 * 获取文档状态钩子函数
 */
function readyStateHandler() {
    return document.readyState;
}

/**
 * 查询指定元素的位置
 */
function getBoundingClientRect(page, selector) {
    return page.evaluate(function(sel) {
        try {
            return document.querySelector(sel).getBoundingClientRect();
        } catch (e) {
            return null;
        }
    }, selector);
}

//开始执行截图
try {
    new Capture();
} catch (ex) {
    console.error(ex);
    phantom.exit();
}