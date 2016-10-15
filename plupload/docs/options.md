#选项
##目录
* [请求](#请求)
  * [browse_button](#browse_button)
  * [url](#url)
* [过滤器](#过滤器)
  * [filters](#filters) `{}`
    * [mime_types](#filters.mime_types) `[]`
    * [max_file_size](#filters.max_file_size) `0`
    * [prevent_duplicates](#filters.prevent_duplicates) `false`
* [控制请求](#控制请求)
  * [headers](#headers) `undefined`
  * [multipart](#multipart) `true`
  * [multipart_params](#multipart_params) `undefined`
  * [max_retries](#max_retries) `0`



##请求
Plupload只有两个必选的选项：`browse_button`和`url`，其余的都是可选的。
如果这两个任何一个缺少，初始化过程都会产生带有`plupload.INIT_ERROR`错误码的`Error`事件。
###browse_button
触发文件选择对话框的DOM元素，当点击该元素后便后弹出文件选择对话框。该值可以是DOM元素对象本身，也可以是该DOM元素的id。
###url
服务器端接收和处理上传文件的脚本地址，可以是相对路径(相对于当前调用Plupload的文档)，也可以是绝对路径。

##过滤器
###filters
可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入。
###filters.mime_types
用来限定上传文件的类型，为一个数组，该数组的每个元素又是一个对象，该对象有title和extensions两个属性，title为该过滤器的名称，extensions为文件扩展名，有多个时用逗号隔开。该属性默认为一个空数组，即不做限制。
###filters.max_file_size
用来限定上传文件的大小，如果文件体积超过了该值，则不能被选取。值可以为一个数字，单位为b,也可以是一个字符串，由数字和单位组成，如`200kb`
###filters.prevent_duplicates
是否允许选取重复的文件，为true时表示不允许，为false时表示允许，默认为false。如果两个文件的文件名和大小都相同，则会被认为是重复的文件。

filters完整的配置示例如下(当然也可以只配置其中的某一项)：
```js
filters: {
  mime_types : [ //只允许上传图片和zip文件
    { title : "Image files", extensions : "jpg,gif,png" }, 
    { title : "Zip files", extensions : "zip" }
  ],
  max_file_size : '400kb', //最大只能上传400kb的文件
  prevent_duplicates : true //不允许选取重复文件
}
```
##控制请求
###headers
设置上传时的自定义头信息，以键/值对的形式传入，键代表头信息属性名，键代表属性值。html4上传方式不支持设置该属性。
###multipart
为`true`时将以`multipart/form-data`的形式来上传文件，为`false`时则以二进制的格式来上传文件。html4上传方式不支持以二进制格式来上传文件，在flash上传方式中，二进制上传也有点问题。并且二进制格式上传还需要在服务器端做特殊的处理。一般我们用multipart/form-data的形式来上传文件就足够了。
###multipart_params
上传时的附加参数，以键/值对的形式传入，服务器端可是使用$_POST来获取这些参数(以php为例)。比如：
```js
multipart_params: {
  one: '1',
  two: '2',
  three: { //值还可以是一个字面量对象
    a: '4',
    b: '5'
  },
  four: ['6', '7', '8']  //也可以是一个数组
}
```
###max_retries
当发生`plupload.HTTP_ERROR`错误时的重试次数，为0时表示不重试。

