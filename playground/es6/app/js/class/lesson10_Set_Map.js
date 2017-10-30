{
  // Set
  // 有何特点？使用场景？
  /*
  1. 类似数组，但成员的值唯一 => 可用于array数组去重： 
      将Set对象转化为Array：[...new Set(array)]
                           Array.from(new Set(array))
  */
  // 如何增删改查？
  /*
  1. Set使用add增加元素，元素判断相等属于“精确相等”，例外情况：
      两个NaN认为相等
      两个对象总是不相等
  2. size 获取总数
  3. add(value) 增
  4. delete(value) 删
  5. has(value) 判断是否存在
  6. clear() 清楚所有元素
  7. keys() 遍历 - 返回键名
     values() 遍历 - 返回键值
     entries() 遍历 - 返回键值对
     forEach() 使用回调函数遍历
  */
  // 如何与之前版本中常用的array和object通用？
  // Set中的元素不能重复
  let list = new Set()
  list.add(5)
  list.add(7)

  console.log('size',list.size)
}

{
  let arr = [1,2,3,4,5]
  let list = new Set(arr)

  console.log('size',list.size)
}

{
  let list = new Set()
  list.add(1)
  list.add(2)
  // 不会报错，不会生效，可以用于去重
  list.add(1)

  console.log('list',list)

  let arr=[1,2,3,1,'2']
  let list2=new Set(arr)

  console.log('unique',list2)
}

{
  let arr=['add','delete','clear','has']
  let list=new Set(arr)
  // 判断是否存在
  console.log('has',list.has('add'))
  // 删除单个元素，返回是否成功删除
  console.log('delete',list.delete('add'),list)
  // 清空
  list.clear()
  console.log('list',list)
}

{
  let arr=['add','delete','clear','has']
  let list=new Set(arr)

  for(let key of list.keys()){
    console.log('keys',key)
  }
  for(let value of list.values()){
    console.log('value',value)
  }
  for(let [key,value] of list.entries()){
    console.log('entries',key,value)
  }
  // 缺点：不能中断循化
  list.forEach(function(item){console.log(item)})
  // for...in 循环带有字符串key对象的方法
}


{
  // 1.WeakSet的元素只能是对象
  // 2.存储对象均为弱引用，如果存储的对象元素被垃圾回收，则不能取到，所以不能被遍历
  let weakList=new WeakSet()

  let arg={}
  weakList.add(arg)
  // weakList.add(2);
  console.log('weakList',weakList)
}

{
  let map = new Map()
  let arr=['123']
  map.set(arr,456)
  console.log('map',map,map.get(arr))
}

{
  let map = new Map([['a',123],['b',456]])
  console.log('map args',map)
  console.log('size',map.size)
  console.log('delete',map.delete('a'),map)
  console.log('clear',map.clear(),map)
}

{
  // key 只能为对象不能为数组
  let weakmap=new WeakMap()
  let o={}
  weakmap.set(o,123)
  console.log(weakmap.get(o))
}

{
  // 数据结构横向对比，增，查，改，删
  let map=new Map()
  let set=new Set()
  let array=[]
  
  // 增
  map.set('t',1)
  let obj = {t:1}
  set.add(obj)
  array.push({t:1})
  console.info('map-set-array',map,set,array)

  // 查
  let map_exist=map.has('t') // 返回boolean值
  let set_exist=set.has(obj)
  let array_exist=array.find(item=>item.t) // 返回查到的数据
  console.info('map-set-array',map_exist,set_exist,array_exist)

  // 改
  map.set('t',2)
  set.forEach(item=>item.t?item.t=2:'')
  array.forEach(item=>item.t?item.t=2:'')
  console.info('map-set-array-modify',map,set,array)

  // 删
  map.delete('t')
  set.forEach(item=>item.t?set.delete(item):'')
  let index=array.findIndex(item=>item.t)
  array.splice(index,1)
  console.info('map-set-array-empty',map,set,array)
}

{
  // map,set,object对比
  let item={t:1}
  let map=new Map()
  let set=new Set()
  let obj={}

  // 增
  map.set('t',1)
  set.add(item)
  obj['t']=1
  console.info('map-set-obj',obj,map,set)

  // 查
  console.info({
    map_exist:map.has('t'),
    set_exist:set.has(item),
    obj_exist:'t' in obj
  })

  // 改
  map.set('t',2)
  item.t=2
  obj['t']=2
  console.info('map-set-obj-modify',obj,map,set)

  // 删除
  map.delete('t')
  set.delete(item) // 如果没有对元素提前建立索引，需使用forEach遍历删除
  delete obj['t']
  console.info('map-set-obj-empty',obj,map,set)
}
// 基于代码语义化和执行效率，对于复杂的数据类型的使用场景，尽量避免array和object的使用，首选map，如果有对数据唯一性的要求再考虑用set。
