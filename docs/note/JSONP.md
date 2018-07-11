

在vue项目开发中，一般使用[axios](https://www.npmjs.com/package/axios)库作为前后端开发数据交互的。有时候我们要使用jsonp去获取数据，但是[axios](https://www.npmjs.com/package/axios)是不支持jsonp的。一些‘机制’的小伙伴会引入jQuery库,使用`$.ajax`来发起jsonp请求，这种方案显然是比较糟糕方案。我们可以去[npm](https://www.npmjs.com/package/jsonp)去搜索纯粹的jsonp的库,基本上第一个就是我们想要的。这里小伙伴们应该想为什么[axios](https://www.npmjs.com/package/axios)不支持jsonp？

### “不要问为什么，要先问是什么”
jsonp的全称叫JSON with padding,主要回调函数与json数据组成，如下所示

```js
    callback({"name":"zhsadsa","age":"sdsadsad"})
```
本质上讲我们可以理解jsonp的跨域和你用`script`标签去获取一个CDN里面的js脚本没啥区别。我要获取上面那样jsonp数据代码这么写
``` html
<body>
    <script src="http://localhost:3001/jsonp" ></script>
</body>

```
后台代码我使用`express`启动一个server，代码如下
```js
    var express = require('express')
    var app = express()
    var router = express.Router();

    var data = {
            name:'zhsadsa',
            age:'sdsadsad'
    }

    router.get('/jsonp',function(req,res){
        res.type('text/javascript');
        res.send('callback('+JSON.stringify(data)+')')
    })


    app.use(router)
    app.listen(3001)
    console.log('服务启动了')
```
在chorme调试工具的network里面可以看到响应内容

![](https://d.pr/gdmwch+)
问题来了，这时候我们改如何将里面的数据打印出来呢？这回文不就是一段js函数调用嘛，那我们提前声明一个叫callback的函数就可以了。因为这里的script脚本都是下载直接执行的，所以这两个标签的顺序不能互换，除非你加个defer
```html
    <script >
        function callback(data) {
                console.dir(data)
        }
    </script>
    <script src="http://localhost:3001/jsonp" ></script>
```
或者
```html

    <script src="http://localhost:3001/jsonp" defer></script>
    <script >
        function callback(data) {
                console.dir(data)
        }
    </script>
```
![](https://d.pr/Q7UvX8+)
后台拼接jsonp数据是写死的callback，我们改进一下后台。再脚本的链接上加上一个请求参数包含函数名
```js
     <script src="http://localhost:3001/jsonp?jsonpCallback=callback" ></script>
```
后台也修改下,改为获取一个函数名然后包裹一个数据

```js
    router.get('/jsonp',function(req,res){
        var  callback = req.param('jsonpCallback')

            res.type('text/javascript');
            res.send(callback+'('+JSON.stringify(data)+')')
    })

```
重启后台，再次刷新demo
![](https://d.pr/Wabuq+)
我们改下函数名
```html
 <script src="http://localhost:3001/jsonp?jsonpCallback=console.log" ></script>
```
![](https://d.pr/hdRTZf+)
直接打印了数据，再试试alert

```html
 <script src="http://localhost:3001/jsonp?jsonpCallback=alert" ></script>
```








