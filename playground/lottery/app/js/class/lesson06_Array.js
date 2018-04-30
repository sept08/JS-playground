{
  // Array() 与 Array.of() 在单传一个整数参数时有所区别
  let arr = Array.of(3,4,7,9,11)
  console.log('arr=',arr)

  let empty=Array.of()
  console.log('empty',empty)
}

{
  // 将伪数组转化为真数组
  let p=document.querySelectorAll('p')
  let pArr=Array.from(p)
  pArr.forEach(function(item){
    console.log(item.textContent)
  })
  // 类似map操作
  console.log(Array.from([1,3,5],function(item){return item*2}))
}

{
  // 数组填充
  console.log('fill-7',[1,'a',undefined].fill(7))
  console.log('fill,pos',['a','b','c'].fill(7,1,3))
}

{
  // 遍历数组
  for(let index of ['1','c','ks'].keys()){
    console.log('keys',index)
  }
  for(let value of ['1','c','ks'].values()){
    console.log('values',value)
  }
  for(let [index,value] of ['1','c','ks'].entries()){
    console.log('values',index,value)
  }
}

{
  // 数组局部自替换
  console.log([1,2,3,4,5].copyWithin(0,3,4))
}

{
  // 数组查取，返回符合条件的第一个元素
  console.log([1,2,3,4,5,6].find(function(item){return item>3}))
  // 数组查取，返回符合条件的第一个元素的索引
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3}))
}

{
  // 数组查询，判断数组中是否包含指定元素，（可以识别NaN）
  console.log('number',[1,2,NaN].includes(1))
  console.log('number',[1,2,NaN].includes(NaN))
}
