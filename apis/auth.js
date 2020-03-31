const crypto = require('crypto');
const url = require('url');

module.exports = function (req, res, token) {
  if(req.method === 'GET') {
    const { signature, echostr, timestamp, nonce } = url.parse(req.url, true).query;

    var str = [token, timestamp, nonce].sort().join('');
    let sha1Str = crypto.createHash("sha1").update(str).digest('hex');
    if (sha1Str === signature) {
      res.end(echostr);
    } else {
      res.end('error');
    }
  }
  
}
