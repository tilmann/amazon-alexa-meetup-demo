'use strict';
var Alexa = require("alexa-sdk");
var https = require("https");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'postLunchPlan' : function () {
        var foodType = this.event.request.intent.slots.foodtype.value;
        
        var alexaSdkContext = this;
        
        var dataForSlack = JSON.stringify({
          text: 'Time for a break. Lets go to our ' + foodType + ' place.',
          username: 'LunchInfo',
          channel: '#demo'
        });
        
    var slackWebhook = {
          host: 'hooks.slack.com',
          port: 443,
          path: 'ENTER YOUR PATH TO THE SLACK WEBHOOK in the form /services/T0UDFQNM/B0FAKE3F/IL3kDONTzdsTRYdsf6Ia',
          method: 'POST',
          headers: {
            'Content-Type': 'application/javascript',
            'Content-Length': Buffer.byteLength(dataForSlack),
          },
        };
        
    
    var req = https.request(slackWebhook, function (res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            // console.log('body: ' + chunk);
            alexaSdkContext.emit(':tell', 'I posted your choice of ' + foodType + ' food on slack.');
          });
        });
    
      req.write(dataForSlack);
      req.end();
        
    }
}