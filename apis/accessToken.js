const rp = require('request-promise-native');

class AccessToken {
  constructor() {
    this.accessToken = ''
    this.expireTime = 0;
    this.instance = null;
  }

  static getInstance() {
    if(!this.instance) {
        this.instance = new AccessToken();
    }
    return this.instance;
  }

  getAccessToken(appID, appsecret) {
    return new Promise((resolve, reject) => {
      let now = Date.now();
      // 如果没超过过期时间，直接返回内存里面的 accessToken，如果超过了，重新获取
      if(now < this.expireTime) {
        resolve(this.accessToken);
      } else {
        rp({
          method: 'get',
          url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`,
          json: true
        }).then(res => {
           this.expireTime = Date.now() + (res.expires_in - 300) * 1000;
           this.accessToken = res.access_token;
           resolve(this.accessToken);
        }).catch(err => {
          reject(err);
        })
      }
    })
    
  }
}

module.exports = AccessToken;
// // test

// let accessToken = new AccessToken();
// accessToken.getAccessToken().then(token => {
//   console.log(token);
// });
// accessToken.log();

// var a = AccessToken.getInstance();
// var b = AccessToken.getInstance();
// if(a === b) {
//   console.log('=')
// } else {
//   console.log('!=')
// }
// a.getAccessToken().then(t => {
//   console.log(a.accessToken)
//   console.log(b.accessToken)
// })