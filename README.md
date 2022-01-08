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
  // wechat.auth(req, res, 'YOUR TOKEN');
  
  message.save(req, res);

  // 收到文本消息
  message.onText(function(msg) {
    console.log(msg);
    message.reply(msg, `收到 ${msg.Content}`);
  })

  // 收到图片消息
  message.onImage(function(msg) {
    message.reply(msg, `收到 image url: ${msg.PicUrl}`);
  })

  // 收到语音消息
  message.onVoice(function(msg) {
    message.reply(msg, `收到 voice: ${msg.MediaId}`);
  })

  // 收到视频消息
  message.onVideo(function(msg) {
    message.reply(msg, `收到 video: ${msg.MediaId}`);
  })

  // 收到短视频消息
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

  // 接收到任意类型的消息时触发，不要与其他消息类型同时使用，否则会触发两次
  // message.on('all', function(msg) {
  //   console.log(msg);
  //   message.reply(msg, `收到 ${msg.Content}`);
  // })

  // 收到 click 消息，菜单上 click 类型的自定义菜单触发，文档：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
  message.onEventView(function(msg) {
    message.reply(msg, '点击菜单');
    res.end('');
  })

  // 收到 view 消息，菜单上 view 类型的自定义菜单触发
  message.onEventView(function(msg) {
    console.log(msg);
    res.end('');
  })

  // 订阅
  message.onEventSubscribe(function(msg) {
    message.reply(msg, '感谢关注');
  })

  // 取消订阅
  message.onEventUnsubscribe(function() {
    console.log('取消关注');
    res.end('');
  })

}).listen(port)

console.log(`server start success in port ${port}`)
```