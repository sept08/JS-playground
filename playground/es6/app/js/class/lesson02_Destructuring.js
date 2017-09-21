{
  let a,b,c,rest;
  [a,b,c=3]=[1,2];
  console.log(a,b);//输出1,2 直接将1和2解构到a和b
}

{
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5,6];
  console.log(a,b,rest);//
}

{
  let a,b;
  ({a,b}={a:1,b:2})
  console.log(a,b);
}
// 对象没有配对成功，值为undefined
{
  let a,b,c,rest;
  [a,b,c=3]=[1,2];
  console.log(a,b,c);
}
// 变量交换
{
  let a=1;
  let b=2;
  [a,b]=[b,a];
  console.log(a,b);
}
// 接收处理结果
{
  function f(){
    return [1,2]
  }
  let a,b;
  [a,b]=f();
  console.log(a,b);
}
// 数组解构赋值，部分取用
{
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,,b]=f();
  console.log(a,b);
}
// 只关心第一个索引值，但不清楚数组长度
{
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,...b]=f();
  console.log(a,b);
}
// 对象解构赋值，注意接收侧保持对象格式
{
  let o={p:42,q:true};
  let {p,q}=o;
  console.log(p,q);
}
// 对象解构赋值，默认值处理
{
  let {a=10,b=5}={a:3};
  console.log(a,b);
}
// 模拟处理后端json数据
{
  let metaData={
    title:'abc',
    test:[{
      title:'test',
      desc:'description'
    }]
  }
  let {title:esTitle,test:[{title:cnTitle}]}=metaData;
  console.log(esTitle,cnTitle);
}
