# gulp-angular

### 简述：该示例是一个使用gulp自动化前端工具构建的基于angular的项目，包含gulp的基本配置，自动刷新、自动添加版本号、自动打包。

使用介绍：

1、首先将项目克隆到本地

```ruby
$ git clone https://github.com/clearself/gulp-angular.git
```
2、下载项目所依赖插件

```ruby
$ npm install
```
3、更改gulp-rev和gulp-rev-collector
```ruby
打开node_modules\gulp-rev\index.js

第144行 manifest[originalFile] = revisionedFile;

更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;
```
```ruby
打开nodemodules\gulp-rev\nodemodules\rev-path\index.js

10行 return filename + '-' + hash + ext;

更新为: return filename + ext;
```
```ruby
打开node_modules\gulp-rev-collector\index.js

31行 if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) {

更新为: if ( !_.isString(json[key]) || path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
```
```ruby
打开node_modules\gulp-assets-rev\index.js

78行 var verStr = (options.verConnecter || "-") + md5;

更新为：var verStr = (options.verConnecter || "") + md5;

80行 src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1");

更新为：src=src+"?v="+verStr;
```

4、继续更改gulp-rev-collector
```ruby
打开node_modules\gulp-rev-collector\index.js
第107行 regexp: new RegExp( '([\/\\\\\'"])' + pattern, 'g' ),
更新为: regexp: new RegExp( '([\/\\\\\'"])' + pattern+'(\\?v=\\w{10})?', 'g' ),
```
修改详情请参考  [进入详情](http://www.jb51.net/article/100652.htm "进入详情") 
5、执行gulp,默认端口为3000，在浏览器中打开http://localhost:3000进入项目
```ruby
$ gulp
```



