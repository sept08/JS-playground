##目录
* [开始](#开始)
  * JSFiddle([JSX](https://jsfiddle.net/reactjs/69z2wepo/),[without JSX](https://jsfiddle.net/reactjs/5vjqabv3/))
  * [CreateReactApp](#createreactapp)
  * [初学者工具包](#初学者工具包)
  * [包管理器](#包管理器)
* [教程](#教程)
* [React思想](#react思想)

##开始
###CreateReactApp
[CreateReactApp](https://github.com/facebookincubator/create-react-app)是官方提供的穿件单页面应用的新方式。它提供了一种无须配置的现代构建安装，需要Node 4以上的版本。
需要注意的是它有一些限制，并且只对单页面应用有效。如果你需要更多的灵活性，或者想要将React集成进已有的项目中，请考虑下面其他选项。
###初学者工具包
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
###包管理器
你也可以通过包管理器使用React（如：npm,Bower）
##教程

##React思想
