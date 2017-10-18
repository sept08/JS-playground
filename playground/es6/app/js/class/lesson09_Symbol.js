{
  // 声明独一无二的变量
  let a1=Symbol()
  let a2=Symbol()
  console.log(a1===a2) // false
  // 先寻找是否存在已经声明的唯一变量，存在返回已声明的，没有则创建
  let a3=Symbol.for('a3')
  let a4=Symbol.for('a3')
  console.log(a3===a4) // true
}

{
  let a1=Symbol.for('abc')
  let obj={
    [a1]:'123',
    'abc':345,
    'c':456
  }
  console.log('obj',obj)
  /* 
  Object {
    abc: 345,
    c: 456
  }
  */

  // Symbol 属性无法通过for...in 或let...of获取到
  for(let [key,value] of Object.entries(obj)){
    console.log('let of',key,value)
  }
  /*
  "let of" "abc" 345
  "let of" "c" 456
  */
  
  // 仅获取 Symbol 属性
  Object.getOwnPropertySymbols(obj).forEach(function(item){
    console.log(obj[item])
  })
  // "123"
  
  // 同时获取普通属性，和Symbol属性
  Reflect.ownKeys(obj).forEach(function(item){
    console.log('ownkeys',item,obj[item])
  })
  /*
  "ownkeys" "abc" 345
  "ownkeys" "c" 456
  "ownkeys" [object Symbol]{} "123"
  */
}
