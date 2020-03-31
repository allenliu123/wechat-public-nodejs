# wechat-public-nodejs

微信公众号开发 nodejs版

根据官方的[微信公众号开发文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)，做了一些封装

### 开发中...

目前只实现 message 相关的代码

### 使用方法

```
var http = require('http');
let wechat = require('wechat-public-nodejs');

let Message = wechat.Message;
let message = new Message();

let port = 8085;

http.createServer(function(req, res) {

  // 验证 token
  wechat.auth(req, res, 'YOUR TOKEN');
  
  message.save(req, res);

  message.onText(function(msg) {
    console.log(msg);
    message.reply(msg, `收到 ${msg.Content}`);
  })

  message.onImage(function(msg) {
    message.reply(msg, `收到 image url: ${msg.PicUrl}`);
  })

  message.onVoice(function(msg) {
    message.reply(msg, `收到 voice: ${msg.MediaId}`);
  })

  message.onVideo(function(msg) {
    message.reply(msg, `收到 video: ${msg.MediaId}`);
  })

  message.onShortVideo(function(msg) {
    message.reply(msg, `收到 short video ${msg.MediaId}`);
  })

  message.onLocation(function(msg) {
    console.log(msg);
    message.reply(msg, `收到 location x: ${msg.Location_X} y: ${msg.Location_Y}`);
  })

  message.onLink(function(msg) {
    message.reqly(msg, `收到 link title: ${msg.Title} description: ${msg.Description} url:${msg.Url}`);
  })

  message.on('all', function(msg) {
    console.log(msg);
    message.reply(msg, `收到 ${msg.Content}`);
  })

}).listen(port)

console.log(`server start success in port ${port}`)
```