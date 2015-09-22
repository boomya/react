var AppDispatcher = require('../dispatcher/AppDispatcher');
var HNConstants = require('../constants/HNConstants');

var HNActions = {
    /**
    * @param  {string} text
    */
    create: function(userId) {
        console.log("ChatActions-->create");
        AppDispatcher.dispatch({
            actionType: HNConstants.HN_USER_CHANGE,
            userId: userId,
        });
    }

};

module.exports = HNActions;
