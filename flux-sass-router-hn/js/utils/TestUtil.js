/**
 * Created by jiangshan on 15/9/14.
 */
var ChatAction = require('../actions/ChatActions');
var MessageDO = require('../utils/MessageDO');

let intervalId;
var TestUtil = {
    simulateSendMessage: function(){
        intervalId = setInterval(function(){
            console.log("simulateSendMessage...");
            var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            let message = new MessageDO(id, 'Sam_Na', 'Sam_Na', id, new Date(), false);
            ChatAction.receive(message);
        }, 5000);
    },
    stopSendMessage: function(){
        clearInterval(intervalId);
    }
    //function simulateSendMessage(){
    //
    //}
};
module.exports = TestUtil;