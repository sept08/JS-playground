#React
* 一个构建用户界面的javascript库
* v15.3.2

|声明|基于组件|基于组件|
|-----|-------|-----|
|React使得创建交互式UI更加自在，它为你应用的每个状态设计简单的视图，并在数据改变时进行有效的更新和正确组件的提供。|  构建独立封装的**组件**以便于管理各自的状态，然后组装他们以实现复杂的用户界面。|  我们不对你其余的技术堆栈做任何假设，所以意味着你可以在**不修改已有代码**的情况下，应用React开发新的特性。
|声明视图使你的代码更加可预测且更容易调试。|  因为用javascript编写的组件逻辑替代了模板，所以你可以在应用上轻松地传递复杂的数据，获取状态而不再采用DOM。|  React在服务端通过Node提供，在移动应用程序上通过React Native提供。
***

###一个简单的组件
React组件实现了一个`render()`方法，该方法可以获取输入数据并返回所要显示的内容。这个例子使用了类似XML的语法——JSX，传给组件的输入数据可在`render()`中通过`this.props`访问。

**JSX对于使用React是可选的而不是必要的**，下面会同时列出由JSX编译器所产生的原生Javascript代码以供参考。

**JSX code:**
```jsx
class HelloMessage extends React.Component{
  render(){
    return <div>Hello {this.props.name}</div>;
  }
}
ReactDOM.render(<HelloMessage name="John" />, mountNode);
```
**Compiled JS code:**
```js
class HelloMessage extends React.Component {
  render(){
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
}
ReactDOM.render(React.createElement(HelloMessage, {name: "John"}), mountNode);
```
###一个有状态的组件
除了可以获取输入数据（通过`this.props`访问）外，组件还可以保存中间状态数据（通过`this.state`访问）。当组件的状态数据改变时，呈现的标记通过重新调用`render()`来进行更新。
**JSX code:**
```JSX
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 0};
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
}

ReactDOM.render(<Timer />, mountNode);
```
###一个应用
我们可以组合`props`和`state`成为一个待办事项的小应用，这个例子使用`state`跟踪事项列表以及用户输入。虽然事件处理程序通常是内联渲染的，但此处可以通过事件代理进行数据的收集和呈现。
```JSX
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<TodoApp />, mountNode);
```
###使用外部插件的组件
React非常灵活并提供挂钩允许你对接外部的库和框架，这个例子使用**remarkable**——一个外部MarkDowm库，来实时转换文本的值。
```JSX
class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 'Type some *markdown* here!'};
  }

  handleChange() {
    this.setState({value: this.refs.textarea.value});
  }

  getRawMarkup() {
    var md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

ReactDOM.render(<MarkdownEditor />, mountNode);
```
