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
```js
class HelloMessage extends React.Component{
  render(){
    return <div>Hello {this.props.name}</div>;
  }
}
ReactDOM.render(<HelloMessage name="John" />, mountNode);
```
**Compiled JS code:**

###一个有状态的组件

###一个应用

###使用外部插件的组件
