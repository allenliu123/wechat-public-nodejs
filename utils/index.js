const { parseString } = require('xml2js');

module.exports = {
  parseToJSON(xmlData) {
    let message = {};
    parseString(xmlData, { trim: true }, (err, data) => {
      if(!err) {
        let xml = data.xml;
        if(typeof xml === 'object') {
          for(let key in xml) {
            let value = xml[key];
            if(Array.isArray(value)) {
              message[key] = value[0];
            }
          }
        }
      } else {
        console.log('parseToJSON error');
      }
    });
    return message;
  },

  parseToXML(message) {
    
  }
}
