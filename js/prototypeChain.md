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
#### 继承方法
在形式上javascript并不具有基于类语言所定义的“方法”，在javascript中，任何函数都可以一个属性的形式赋给一个对象。继承函数和其他属性其实没有多大差别，包括上面所提到的属性遮蔽（一种方法重写的形式）

继承函数运行时，其`this`指针所指向的是当前的继承的对象，而非函数所在的原型对象。
```javascript
var o = {
  a: 2,
  m: function(b){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m时, 'this' 指向 o

var p = Object.create(o);
// p 为继承自 o 的对象

p.a = 4; // 在 p 上创建一个自有属性 a。
console.log(p.m()); // 5
// 当 p.m 被调用时, 'this' 指向 p.
// p 从 o 中继承了函数 m,
// 'this.a' 等于 p.a。
```
### 不同的方法创建对象和生成原型链
#### 普通语法创建对象
```JavaScript
var o = {a: 1};

// 这种方式创建的对象 o 的原型对象为 Object.prototype
// o 还拥有一个名为 'hasOwnProperty' 的属性
// hasOwnProperty 是 Object.prototype 中的自有属性.
// 所以 o 从 Object.prototype 中继承了 hasOwnProperty
// Object.prototype 的原型为 null.
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// Arrays 继承自 Array.prototype
// (其中包含的方法有 indexOf, forEach, 等.)
// 其原型链可表示成如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// Functions 继承自 Function.prototype
// (其中包含的方法有 call, bind, 等.)
// f ---> Function.prototype ---> Object.prototype ---> null
```
#### 使用构造器创建
javascript中的“构造器”就是使用`new`运算符调用的函数
```javascript
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};

var g = new Graph();
// g 是包含属性 'vertices' 和 'edges' 的对象.
// 当 new Graph() 执行时，g.[[Prototype]] 为 Graph.prototype 的值。
```
#### 使用`Object.create`创建
ECMAScript 5 引入了一个新函数：`Object.create`. 调用这个方法可以创建一个新对象，这个对象的原型就是函数的第一个参数。
```javascript
var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty);
// undefined, 因为 d 没有继承自 Object.prototype
```
#### 使用class关键字创建
ECMAScript 6 引入了一套新的关键字来实现“类”，虽然这种构造方式会让使用基于类语言的开发者感觉比较熟悉，但实际上是不一样的。javascript依然是基于原型的，新关键字包括： class, constructor, static, extends, 和 super.
```javascript
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
```
#### 性能
查询属性的时间花费会随着在原型链上的遍历而增大，这对性能会产生负面影响。如果对性能有明确的要求，这一点将至关重要。另外，试图访问一个不存在的属性时，将总会遍历整条原型链。

同样的，当在一个对象上进行迭代时，原型链上的每一个枚举属性都会枚举到。

为了判断某个属性是否属于该对象的自有属性而非存在于原型链上时，可以使用`hasOwnProperty`方法，该方法继承自`Object.prototype`。`hasOwnProperty`方法也是javascript中唯一判断非原型链上属性的方法。

> 注意：如果只是判断属性的值是否为`undefined`是不够的，可能属性恰好存在但其值被设为`undefined`。

####　不好的尝试：扩展原生原型对象
经常去扩展`Object.prototype`或其他内建原型是错误的特性。

这种行为叫做“monkey patching”和破坏封装性，虽然会被像Prototype.js等流行框架使用，但对于采用非标准函数破坏内建类型依旧没有搞得原因。

扩展内建原型的唯一好的理由是，完善新javascript引擎的特性，例如Array.forEach等
```javascript
function A(a){
  this.varA = a;
}

// What is the purpose of including varA in the prototype when A.prototype.varA will always be shadowed by
// this.varA, given the definition of function A above?
A.prototype = {
  varA : null,  // Shouldn't we strike varA from the prototype as doing nothing?
      // perhaps intended as an optimization to allocate space in hidden classes?
      // https://developers.google.com/speed/articles/optimizing-javascript#Initializing instance variables
      // would be valid if varA wasn't being initialized uniquely for each instance
  doSomething : function(){
    // ...
  }
};

function B(a, b){
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null,
    enumerable: true,
    configurable: true,
    writable: true
  },
  doSomething : {
    value: function(){ // override
      A.prototype.doSomething.apply(this, arguments); // call super
      // ...
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
B.prototype.constructor = B;

var b = new B();
b.doSomething();
```
重要的部分：
*   类型定义在`.prototype`中
*   使用`Object.create()`进行继承
### prototype 和 Object.getPrototypeOf
javascript使来自java和C++的开发者感到些许困惑的原因是，

### 参考
1.  <a name="footnote-1"></a>语法糖：Syntactic sugar，也译为糖衣语法，是由英国计算机科学家彼得·约翰·兰达（Peter J. Landin）发明的一个术语，指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。
