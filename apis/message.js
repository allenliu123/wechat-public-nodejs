const { parseToJSON } = require('../utils');

function receiveMessage(req, type, callback) {
    var xmlData = '';
    req.on('data', data => {
      xmlData += data.toString();
    }).on('end', () => {
      let message = parseToJSON(xmlData);
      if(type === 'all') {
        callback(message);
      } else if(type === message.MsgType) {
        callback(message);
      }
    })
}

class Message {
  constructor() {
    
  }

  save(req, res) {
    this.req = req;
    this.res = res;
  }

  on(type, callback) {
    receiveMessage(this.req, type, callback);
  }

  onAll(callback) {
    receiveMessage(this.req, 'all', callback);
  }

  onText(callback) {
    receiveMessage(this.req, 'text', callback);
  }

  onImage(callback) {
    receiveMessage(this.req, 'image', callback);
  }

  onVoice(callback) {
    receiveMessage(this.req, 'voice', callback);
  }

  onVideo(callback) {
    receiveMessage(this.req, 'video', callback);
  }

  onShortVideo(callback) {
    receiveMessage(this.req, 'shortvideo', callback);
  }

  onLocation(callback) {
    receiveMessage(this.req, 'location', callback);
  }

  onLink(callback) {
    receiveMessage(this.req, 'link', callback);
  }

  reply(msg, str) {
    let textXml = `<xml>
      <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
      <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${str}]]></Content>
    </xml>`
    this.res.end(textXml);
  }
}

module.exports = Message;
