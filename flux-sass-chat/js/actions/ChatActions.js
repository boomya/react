var AppDispatcher = require('../dispatcher/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ChatActions = {
    /**
    * @param  {string} text
    */
    create: function(text, threadId) {
        console.log("ChatActions-->create");
        AppDispatcher.dispatch({
            actionType: ChatConstants.CHAT_CREATE,
            text: text,
            threadId: threadId,
        });
    },
    clickThread: function(threadId) {
        console.log("ChatAction-->threadId:" + threadId);
        AppDispatcher.dispatch({
            actionType: ChatConstants.CHAT_CLIECK_THREAD,
            threadId: threadId
        });
    },
    receive: function(message){
        console.log("ChatAction-->receive");
        AppDispatcher.dispatch({
            actionType: ChatConstants.CHAT_RECEIVE_MESSAGE,
            message: message
        });
    }

};

module.exports = ChatActions;
