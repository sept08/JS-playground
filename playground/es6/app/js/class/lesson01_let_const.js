function test(){
  // for(let i=1;i<3;i++){
  //   console.log(i);
  // }
  // console.log(i);
  let a = 1;
  // let a = 2;
}

function last(){
  const PI=3.1415926; // 常量也是块级作用域
  const k={
    a:1
  }
  k.b=3; // 对象和数组的赋值为引用赋值，引用的指针不可修改，但所引用的对象可以修改
  console.log(PI,k);
}


// test();
last();
