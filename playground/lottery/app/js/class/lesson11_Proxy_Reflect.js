{
  // 元编程，对编程语言进行编程
  // Proxy
  /*
  使用形式：
    new Proxy(target, handler) 创建代理实例，若使拦截生效需调用代理实例
    {proxy: new Proxy(target, handler)} 将代理属性化，对象默认先调用代理方法
  拦截方法：
    1. get()
    2. set()
    3. apply() 拦截函数的调用、call和apply操作
    4. has() 拦截HasProperty操作
    5. construct() 拦截new命令
    6. deleteProperty() 拦截delete操作
    7. defineProperty() 拦截了Object.defineProperty操作，添加新属性
    8. getOwnPropertyDescriptor() 拦截Object.getOwnPropertyDescriptor()，查看属性描述符（值，是否可配置，是否可枚举，是否可写）
    9. isExtensible() 拦截Object.isExtensible操作,返回值为布尔值
   10. preventExtensions() 拦截Object.preventExtensions()
   11. getPropertyOf() 拦截获取对象原型
       拦截操作包括：
       Object.prototype.__proto__
       Object.prototype.isPrototypeOf()
       Object.getPrototypeOf()
       Reflect.getPrototypeOf()
       instanceof
   12. setPrototypeOf() 拦截Object.setPrototypeOf方法
   13. ownKeys() 拦截对象自身属性的读取操作
       Object.getOwnPropertyNames()
       Object.getOwnPropertySymbols()
       Object.keys()
  */
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  }

  let monitor=new Proxy(obj,{
    // 拦截对象属性的读取
    get(target,key){
      return target[key].replace('2017','2018')
    },
    // 拦截对象设置属性
    set(target,key,value){
      if(key==='name'){
        return target[key]=value
      }else{
        return target[key]
      }
    },
    // 拦截key in object操作
    has(target,key){
      if(key==='name'){
        return target[key]
      }else{
        return false
      }
    },
    // 拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){
        delete target[key]
        return true;
      }else{
        return target[key]
      }
    },
    // 拦截Object.keys, Object.getOwnPropertySymbols, Object.getOwnPropertyNames
    ownKeys(target){
      return Object.keys(target).filter(item=>item!='time')
    }
  })

  console.log('get',monitor.time)
  monitor.time='2018'
  monitor.name='mukewang'
  console.log('set',monitor.time,monitor)
  console.log('has','name' in monitor,'time' in monitor)

  // delete monitor.time
  // console.log('delete',monitor)
  //
  // delete monitor._r
  // console.log('delete',monitor)
  console.log('ownKeys',Object.keys(monitor))
}

{
  // Reflect
  /*
  用法
  1. 将Object对象的一些明显属于语言内部的方法，放到Reflect对象上。
  2. 修改某些Object方法的返回结果，让其变得更合理。
  3. 让Object操作都变成函数行为。
  4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
  */
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  console.log('Reflect get',Reflect.get(obj,'time'));
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  console.log('has',Reflect.has(obj,'name'));
}


{
  function validator(target,validator){
    return new Proxy(target,{
      _validator:validator,
      set(target,key,value,proxy){
        if(target.hasOwnProperty(key)){
          let va=this._validator[key]
          if(!!va(value)){
            return Reflect.set(target,key,value,proxy)
          }else{
            throw Error(`不能设置${key}到${value}`)
          }
        }else{
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators={
    name(val){
      return typeof val==='string'
    },
    age(val){
      return typeof val === 'number' && val>18
    },
    mobile(val){
      
    }
  }

  class Person{
    constructor(name,age){
      this.name=name
      this.age=age
      this.mobile='1111'
      return validator(this,personValidators)
    }
  }

  const person=new Person('lilei',30)
  console.info(person)
  person.name='Han mei mei'
  console.info(person)
}
