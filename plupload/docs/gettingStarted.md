#起步
###目录
* [准备](#准备)
* [增加基本的HTML框架](#增加基本的html框架)
* [初始化Plupload](#初始化plupload)
* [创建上传处理程序](#创建上传处理程序)
* [启动文件队列](#启动文件队列)
* [错误处理](#错误处理)
* [启动开始上传按钮](#启动开始上传按钮)
* [完整实例](#完整实例)

##准备
最新版本的[Plupload](http://www.plupload.com/download.php)总是可以从其官网的下载界面获得的。

简单起见，我们复制整个`js/`文件夹到示例html所在的路径。

![prepare img](https://camo.githubusercontent.com/716d59f99b288426256c053432bb6e05fed86caa/68747470733a2f2f7261772e6769746875622e636f6d2f77696b692f6d6f786965636f64652f706c75706c6f61642f47657474696e67253230537461727465642f30312d66696c652d7374727563747572652e706e67)

我们首先从包含`js/plupload.full.min.js`开始，核心API不依赖与jQuery或其他任何框架，只靠自己就可以使用。

##增加基本的HTML框架
现在我们需要一组DOM元素来承载典型文件上传器的主要功能组件——浏览按钮，上传按钮以及文件队列。
```html
<ul id="filelist"></ul>
<br />

<div id="container">
    <a id="browse" href="javascript:;">[Browse...]</a> 
    <a id="start-upload" href="javascript:;">[Start Upload]</a>
</div>
```
现在让我们给他们赋予生命。

##初始化Plupload
首先我们需要实例化Plupload上传器：
```html
<script type="text/javascript">
var uploader = new plupload.Uploader({
    browse_button: 'browse', //此为DOM元素的ID或者DOM元素本身
    url: 'upload.php'
});

uploader.init();
</script>
```
值得注意的是我们显式地调用`uploader`对象的`init()`方法来实例化它，对于这样做的原因我们稍后会做解释，在我们为`uploader`绑定任何事件前，先简单的记着我们是如此调用的就好。

通常你的配置将比这更多，但目前你所需的就是这些——浏览按钮和服务器端处理程序的URL，它将接收文件后做一些安全性校验，最后将他们移动到目的文件夹。
##创建上传处理程序
现在让我们做一些事情：创建目的文件夹——`uploads/`，这里将存放上传的文件（他需要有写权限）；上传处理程序——`upload.php`，它将移动文件到方才的文件夹中。

你可能并没学过PHP相关课程，但下面的主逻辑非常简单且易于移植到任何其他服务器端语言上。
```php
if(empty($_FILES) || $_FILES["file"]["error"]){
    die('{"OK": 0}');
}

$fileName = $_FILES["file"]["name"];
move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/$fileName");

die('{"OK": 1}');
```
简单起见，我们只移动文件而没有做任何校验（实际情况下这是不完备的），如果从服务器端返回一些响应（例如简单的JSON）会更好，这样你便可通过Plupload捕获到请求的结束。

##启动文件队列
这一步完全取决于你，例子中我们会向临时队列里增加一些选择的文件，并显示每个文件的上传进度。为了实现这个要求，我们需要绑定两个事件：`FilesAdded`和`UploadProgress`。
```js
uploader.bind('FilesAdded', function(up, files){
	var html = '';
	plupload.each(files, function(file){
		html += '<li id="' + file.id + '">' + file.name + ' (' +plupload.formatSize(file.size) + ')<b></b></li>';
	});
	document.getElementById('filelist').innerHTML += html;
});
```
列表中的每一行对应我们的一个文件，注意到空的`<b></b>`标签，我们将在其中填入上传数据进度的百分比。

##错误处理

##启动开始上传按钮

##完整实例
