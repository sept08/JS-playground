##目录
* [开始](#开始)
  * JSFiddle([JSX](https://jsfiddle.net/reactjs/69z2wepo/),[without JSX](https://jsfiddle.net/reactjs/5vjqabv3/))
  * [CreateReactApp](#createreactapp)
  * [初学者工具包](#初学者工具包)
  * [包管理器](#包管理器)
* [教程](#教程)
  * [服务器](#服务器)
  * [起步](#起步)
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
###包管理器
你也可以通过包管理器使用React（如：npm,Bower）
##教程
我们将构建一个简单而实用的评论框，你可将其引入博客或基础版的实评系统中使用，就像Disqus,LiveFyre或Facebook里的那样。
我们将提供：
* 所有评论的视图
* 提交评论的表单
* 为你提供自定义的后台

它还具有一些灵活的特性：
* **优化评论**：评论在保存到服务器之前就会出现在列表中，所以感觉很快。
* **实时更新**：其他用户的评论会实时地出现在评论视图中。
* **Markdown格式化**：用户可以是用Markdown来格式化他们文本。

如果想跳过这些描述看源码，可直接访问[Github上的该项目](https://github.com/reactjs/react-tutorial)

###服务器
在开始本教程之前，我们需要准备一个正在运行的服务器。它只单纯地作为获取和保存数据使用。简单起见，我们只用脚本语言创建此刚刚好的服务器。你可以[查看本教程源码](https://github.com/reactjs/react-tutorial/)或[下载其zip文件](https://github.com/reactjs/react-tutorial/archive/master.zip)以开始后续教程。
简单起见，服务器使用JSON文件作为数据库，在生产环境中你当然不能这么搞，但这确实使调试变得简单。一旦你启动了服务器，它就开始将对API及静态页面提供支持。

###起步
本教程凡是从简，上述讨论的服务器包为一个HTML文件，在编辑器中打开`public/index.html`如下：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Tutorial</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/base.css" />
    <script src="https://unpkg.com/react@15.3.0/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15.3.0/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
    <script src="https://unpkg.com/remarkable@1.7.1/dist/remarkable.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/babel" src="scripts/example.js"></script>
    <script type="text/babel">
      // To get started with this tutorial running your own code, simply remove
      // the script tag loading scripts/example.js and start writing code here.
    </script>
  </body>
</html>
```
本教程的剩余部分，我们将在`script`标签中编写JavaScript代码，由于没有包含任何高级的实时重载工具，所以想看到每次修改的效果，你需要保存后刷新浏览器。接下来启动服务器后在浏览器中打开`http://localhost:3000`。若你首次加载且没做任何修改，你会看到我们将要完成的样子。当你准备开始的时候，只需要删除首个`script`标签后再继续。
> **注意：**
此例中包含jQuery是为了以后AJAX调用的方便，其实React的工作对其并不依赖。

##React思想
