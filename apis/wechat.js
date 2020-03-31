
class Wechat {

  constructor(args) {
    // 单例模式
    if(!Wechat.instance) {
      Wechat.instance = this;
    }
    return Wechat.instance;
  }

  config(args) {
    this.appID = args.appID || '';
    this.appsecret = args.appsecret || '';
    this.token = args.token || '';
    if(args.token) {
      app.get('/auth', auth(args.token));
    }
    let port = args.port || 80;
    app.listen(port, console.log(`server start success in port ${port}`));
    app.use((req, res) => {
      mes.handle(req, res);
    })
  }

  Message() {
    return M;
  }
}

let mes = new Message();

function init(args) {
  if(args.token) {
    app.get('/auth', auth(args.token));
  }
  config.appID = args.appID;
  config.appsecret = args.appsecret;
  let port = args.port || 8080;
  app.listen(8085, console.log('server start success in port 8085'));
  app.use((req, res) => {
    mes.handle(req, res);
  })
}

function onText(callback) {
  mes.receiveMessage().then(msg => {
    callback(msg)
  })
}

function sendText(msg, str) {
  mes.sendMessage(msg, str);
}

module.exports = Wechat;