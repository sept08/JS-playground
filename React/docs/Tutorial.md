#教程

1. [服务器](#服务器)
1. [起步](#起步)
1. [首个组件](#首个组件)
1. [组合组件](#组合组件)
1. [使用props](#使用props)
1. [增加markdown](#增加markdown)
1. [添加数据模型](#添加数据模型)

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
      // 移除scripts/example.js标签，在此写你的代码以开始本教程
    </script>
  </body>
</html>
```
本教程的剩余部分，我们将在`script`标签中编写JavaScript代码，由于没有包含任何高级的实时重载工具，所以想看到每次修改的效果，你需要保存后刷新浏览器。接下来启动服务器后在浏览器中打开`http://localhost:3000`。若你首次加载且没做任何修改，你会看到我们将要完成的样子。当你准备开始的时候，只需要删除首个`script`标签后再继续。
> **注意：**
此例中包含jQuery是为了以后AJAX调用的方便，其实React的工作对其并不依赖。

###首个组件
React是由模块、组件组合构成的。对于我们的评论框实例，我们将采用如下组件结果：
```
 - CommentBox
   - CommentList
     - Comment
   - CommentForm
```
我们通过简单的`<div>`来构建`CommentBox`组件：
```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```
值得一提的是原生HTML元素名称以小写字母开头，自定义React类名以大写字母开头。
####JSX 语法
相信你注意到了Javascript中的类XML语法，我们可通过简单的预编译器将其转化成原生JS:
```js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
```
这种语法的使用是可选的，只是我们觉得JSX语法比原生JS语法简单，关于JSX的更多内容会在后面介绍。
####发生了什么
我们传递包含一些方法的JavaScript对象给`React.createClass()`以创建新的React组件。这些方法中最重要的是`render()`,它返回呈现到HTML上的React组件树。

`<div>`标签并非实际的DOM节点，他们只是React `div` 组件的实例化。你可以把他们当做标记或数据片，React会知道如何处理。React是**安全的**，它不会产生HTML字符串所以默认是防XSS。

你不需要返回基本HTML，只需返回你所构建的组件树。这就是React可以**组合**的原因——可维护前端的关键信条。

`ReactDOM.render()`会实例化出根组件并启动框架，以及将标记注入第二个参数指向的原始DOM元素。
`ReactDOM`模块公开了指定DOM的相关方法，`React`会在不同平台上共享核心工具。
本教程脚本底部的`ReactDOM.render`方法很重要，它应当在复合组件被定义后再调用。
###组合组件
接下来我们构建`CommentList`和`CommentForm`组件：
```js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
```
接着更新`CommentBox`组件，加入上面新建的两个组件：
```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
```
> 为了避免全局命名空间的污染，JSX编译器会自动重写HTML标签

###使用props
我们创建`Comment`组件，其数据来源于`CommentList`组件。可通过`this.props`指定属性键值来获取HTML标签的属性值，标签任何内嵌元素都可通过`this.props.children`获取。
```js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
```
###组件属性
上面已定义了`Comment`组件，现想给其传递作者名和评论文本，这允许我们为每个不同的评论重用相同的代码，以下在`CommentList`组件中增加一些评论：
```js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
```
注意到我们传递的数据是从父组件`CommentList`到子组件`Comment`的。例如，把Pete Hunt（由`author`属性获得）与*This is one comment*（由类XML子节点获得）传递给第一个`Comment`。如上述代码可知，`Comment`可通过`this.props.author`和`this.props.children`获取对应的属性数据。

###增加Markdown
Markdown是一种内联格式化文本的简单方式，比如你可以用星号包围文本以对其强调。
本教程我们使用第三方库**remarkable**来处理Markdown文本，将其转化以替代原始HTML。实例中已经引入该库，所以在脚本中可以直接使用：
```js
var Comment = React.createClass({
  render: function() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    );
  }
});
```
由于需要将`this.props.children`从React包裹的文本转化为remarkable可理解的原始字符串，所以需要调用`toString()`方法来完成。但这存在一个问题，我们在浏览器中呈现的评论看起来是这个样子：“`<p>`This is `<em>`another`</em>` comment`</p>`”，可我们希望这些标签可被当做HTML进行渲染。这是因为React保护你面授XSS攻击，这里有一个方法可以解决它但框架会警告你不要这样用：
```js
var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
```
这个特殊的API故意使得插入原始HTML变得困难，但对于remarkable我们将利用这个后门。

###添加数据模型
目前为止我们还是直接在源代码中插入评论，现在我们用二进制JSON数据替代评论列表中内容，最终这些数据将来自服务器，但目前还是先将其写在源码中：
```js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
```
我们需要将这些数据插入`CommentList`，在`ReactDOM.render()`通过props传递这些数据：
```js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```
接下来就可以动态的添加评论了：
```js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
```
