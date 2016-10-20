#在React中思考

1. [将界面划分成组件的层次结构](#将界面划分成组件的层次结构)

##将界面划分成组件的层次结构  
首先要做的是将界面草图中的每个组件（以及子组件）用方框括起来并对其命名。如果你是和设计师一起工作，他们可能已经完成这步，你只需找他们要就可以。他们PS的图层名也许最后就成了你React组件的名字。  
但你怎么知道如何去划分一个组件呢？其实这和你创建一个新函数或对象采用的划分方法是一样的——**单一直责原则**，就是一个组件理想情况下只做一件事。如果它以后增长，其也是可以被拆分成较小的子组件的。  
由于经常将JSON数据模型展示给用户，你会发现如果数据模型构建的合适，界面也会很好映射。这是因为界面和数据模型都倾向于相同的信息结构，所以将界面划分成组件的工作意义就不那么重要，而只需按照数据模型去划分组件就好了。  
![mock](https://facebook.github.io/react/img/blog/thinking-in-react-components.png)  
上面例子中包含了五个组件，以下将用斜体表示每个组件所代表的数据：

1. FilterableProductTable(<font color="orange">橙色</font>)：包括了整个例子
1. SearchBar(<font color="blue">蓝色</font>)
1. ProductTable(<font color="green">绿色</font>)
1. ProductCategoryRow(<font color="turquoise">青色</font>)
1. ProductRow(<font color="red">红色</font>)
