## 继承和原型链

由于JavaScript是动态的且不提供类实现的本身，所以其对有基于类语言(比如Java或C++)经验的开发者来说可能会产生一些困惑（类关键字于ES6引入，但属于语法糖<sup>[[1]](#footnote-1)</sup>，JavaScript仍保持基于原型）。

当谈到继承JavaScript只有一个结构：对象。每一个对象都有指向它的**原型**（prototype）对象的内部链接。那个原型对象也有它自己的原型，如此一直到原型为`null`的对象。定义`null`没有原型，其即为所在**原型链**的最后一个链接。

虽然原型继承模型经常被视作JavaScript的弱点之一，但实际上却比类继承模型强大许多。例如，在原型继承模型的基础上创建类继承模型是相当轻而易举的。

### 基于原型链的继承
#### 继承属性
JavaScript对象是动态的属性“包”（称**自有属性**），JavaScript拥有一个关联其原型对象的链接。当试图访问一个对象的属性时，该属性将不止在当前对象上查询，还会在该对象的原型上以及原型的原型上查找，直到一个名字匹配的属性被找到或者到达该原型链的终点。

> 根据ECMAScript标准，`someObject`的原型可以用记号`someObject.[[Prototype]]`来指定。这个等价于JavaScript的`__proto__`属性（现已弃用）。它不应与函数的`func.prototype`属性混淆。其改为指向所有给定函数实例的`[[Prototype]]`。从ECMAScript 6开始`[[Prototype]]`可以通过`Object.getPrototypeOf()`和`Object.setPrototypeOf()`方法访问。

以下为视图访问对象属性时发生的行为：
```javascript
// 假设我们有一个对象 o，以及其两个属性 a 和 b ：
// {a:1, b:2}
// o.[[Prototype]] 拥有两个属性 b 和 c :
// {b:3, c:4}
// 最后，o.[[Prototype]].[[Prototype]] = null
// 定义null是没有[[Prototype]]的，支持原型链可看成如下的样子：
// {a:1, b:2} ---> {b:3, c:4} ---> null
console.log(o.a); // 1
// o 是否具有属性a？是的，其值为1。

console.log(o.b); // 2
// o 是否具有属性b？是的，其值为2。
// o.[[Prototype]] 也有属性 b, 但其不可访问，就叫做‘属性遮蔽’

console.log(o.c); // 4
// o 是否具有属性c？没有，查找它的原型。
// o.[[Prototype]] 是否具有属性c？是的，其值为4。

console.log(o.d); // undefined
// o 是否具有属性d？没有，查找它的原型。
// o.[[Prototype]] 是否具有属性d？没有，查找它的原型。
// o.[[Prototype]].[[Prototype]] 是 null，停止查找。
// 未找到属性，返回 undefined
```

### 参考
1.  <a name="footnote-1"></a>语法糖：Syntactic sugar，也译为糖衣语法，是由英国计算机科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。
