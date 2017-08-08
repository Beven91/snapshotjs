## dante

### 一、简介

基于phantomjs的截屏工具


### 二、安装

全局安装

	npm install snapshotjs --g

本地安装

	npm install snapshotjs --save    
     
### 三、用例
	
   全局模式:
   
   	snapshot -u=https://www.baidu.com -o=c:/snapshot/baidu.png

   本地模式:
   
```js

	var snapshot  = require('snapshot');
	
	snapshot.capture('https://www.baidu.com','c:/snapshot/baidu.png',{});    
	    
```
    
### 四、开源许可
基于 [MIT License](http://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。
