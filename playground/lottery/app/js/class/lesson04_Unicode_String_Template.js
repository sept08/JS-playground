// unicode
{
  console.log('a',`\u0061`);
  console.log('s',`\u20BB7`);

  console.log('s',`\u{20BB7}`);
}

{
  let s='𠮷';
  console.log('length',s.length); // 2
  console.log('0',s.charAt(0)); // charAt 获取按每两个字节组成的字符(ASCII码)
  console.log('1',s.charAt(1));
  console.log('at0',s.charCodeAt(0));// charCodeAt 获取两个字节组成字符的ASCII码值
  console.log('at1',s.charCodeAt(1));

  let s1='𠮷a';
  console.log('length',s1.length);
  console.log('code0',s1.codePointAt(0));// codePointAt 获取Unicode码值，传参为识别起始点，单位为字(16位)
  console.log('code0',s1.codePointAt(0).toString(16));
  console.log('code1',s1.codePointAt(1));
  console.log('code2',s1.codePointAt(2));
}

{
  console.log(String.fromCharCode("0x20bb7"));// ES5，码值转化为字符
  console.log(String.fromCodePoint("0x20bb7"));// ES6，码值转化为字符，可处理Unicode
}
// 字符串遍历
{
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]);
  }
  // 可处理包含Unicode字符的字符串
  for(let code of str){
    console.log('es6',code);
  }
}
// 判断是否包含字符串、是否以子字符串起始/结尾
{
  let str="string";
  console.log('includes',str.includes("c"));
  console.log('start',str.startsWith('str'));
  console.log('end',str.endsWith('ng'));
}
// 字符串重复
{
  let str="abc";
  console.log(str.repeat(2));
}
// 模板字符串
{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m);
}
// 属于ES6草案，需要引入babel-polyfill包方可使用
// 字符补白
{
  console.log('1'.padStart(2,'0'));
  console.log('1'.padEnd(2,'0'));
}
// 标签模板
// 作用 1，过滤HTML字符串防止XSS攻击。2，处理多语言转换
{
  let user={
    name:'list',
    info:'hello world'
  };
  console.log(abc`i am ${user.name},${user.info}`);
  function abc(s,v1,v2){
    console.log(s,v1,v2);
    return s+v1+v2
  }
}
// 使用原始字符串，不自动对特殊字符串转义
{
  console.log(String.raw`Hi\n${1+2}`);
  console.log(`Hi\n${1+2}`);
}
