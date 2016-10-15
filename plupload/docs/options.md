#选项
##目录
* [请求](#请求)
  * [browse_button](#browse_button)
  * [url](#url)

##请求
Plupload只有两个必选的选项：`browse_button`和`url`，其余的都是可选的。
如果这两个任何一个缺少，初始化过程都会产生带有`plupload.INIT_ERROR`错误码的`Error`事件。
###browse_button
触发文件选择对话框的DOM元素，当点击该元素后便后弹出文件选择对话框。该值可以是DOM元素对象本身，也可以是该DOM元素的id。
###url
服务器端接收和处理上传文件的脚本地址，可以是相对路径(相对于当前调用Plupload的文档)，也可以是绝对路径。
