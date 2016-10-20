#起步
* JSFiddle([JSX](https://jsfiddle.net/reactjs/69z2wepo/),[without JSX](https://jsfiddle.net/reactjs/5vjqabv3/))
* [CreateReactApp](#createreactapp)
* [初学者工具包](#初学者工具包)
* [包管理器](#包管理器)

##CreateReactApp
[CreateReactApp](https://github.com/facebookincubator/create-react-app)是官方提供的穿件单页面应用的新方式。它提供了一种无须配置的现代构建安装，需要Node 4以上的版本。
需要注意的是它有一些限制，并且只对单页面应用有效。如果你需要更多的灵活性，或者想要将React集成进已有的项目中，请考虑下面其他选项。
##初学者工具包
[下载](https://facebook.github.io/react/downloads.html)
如果你刚刚起步，你可以下载初学者工具包。开发包包括React和React DOM对于浏览器的预先构建的拷贝，以及帮助你起步的常用实例。
在初学者工具包根目录下创建`helloworld.html`文件，内容如下：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```
JavaScript内嵌的XML语法叫作JSX（后续会有更多介绍）,为将其转化成vanilla JavaScript我们使用`<script type="text/babel">`，浏览器会转化Babel标签内的信息。从浏览器中打开该html，你就可以看到这句问候语了。

React JSX代码可以存放在独立的文件中，创建如下`src/helloworld.js`:
```js
ReactDOM.render(
 <h1>Hello, world!</h1>,
 document.getElementById('example')
);
```
并在`helloworld.html`中做如下引用:
```html
<script type="text/babel" src="src/helloworld.js"><script>
```
值得注意的是一些浏览器如非在HTTP下，加载文件时会出错。
##包管理器
你也可以通过包管理器使用React（如：npm,Bower）
