/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants');
var assign = require('object-assign');
var MessageDO = require('../utils/MessageDO');

var CHANGE_EVENT = 'change';

//let _messages = new Map()
//	.set(
//		'default', [
//			{id:1, threadName:'default', text:'testtesttest1', date:new Date()},
//			{id:2, threadName:'default', text:'testtesttest2', date:new Date()},
//			{id:3, threadName:'default', text:'testtesttest3', date:new Date()}
//		]
//	)
//    .set(
//        'Sam_Na', [
//            {id:4, threadName:'Sam and Na', text:'Sam and Na1', date:new Date()},
//            {id:5, threadName:'Sam and Na', text:'Sam and Na2', date:new Date()},
//            {id:6, threadName:'Sam and Na', text:'Sam and Na3', date:new Date()}
//        ]
//    );
let _messages = new Map()
    .set(
    'default', [
        new MessageDO(1, 'default', 'default', 'testtesttest1', new Date(), true),
        new MessageDO(2, 'default', 'default', 'testtesttest2', new Date(), true),
        new MessageDO(3, 'default', 'default', 'testtesttest3', new Date(), true)
    ]
)
    .set(
    'Sam_Na', [
        new MessageDO(4, 'Sam_Na', 'Sam_Na', 'Sam and Na1', new Date(), true),
        new MessageDO(5, 'Sam_Na', 'Sam_Na', 'Sam and Na2', new Date(), true),
        new MessageDO(6, 'Sam_Na', 'Sam_Na', 'Sam and Na3', new Date(), true)
    ]
);

let _currentThreadId = 'default';

//let _threads = new Map()
//    .set('default', {id:3, threadName:'default', text:'testtesttest3', date:new Date()})
//    .set('Sam_Na', {id:6, threadName:'Sam and Na', text:'Sam and Na3', date:new Date()});
let _threads = new Map()
    .set('default', _messages.get('default')[2])
    .set('Sam_Na',  _messages.get('Sam_Na')[2]);
let _unreadThreads = new Set();

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text, threadId) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let message = new MessageDO(id, threadId, threadId, text, new Date(), true);
    receive(message);
}

function receive(message){
    let threadId = message.threadId;
    let currentThreadMessages = [];
    if(_messages.has(threadId)){
        currentThreadMessages = [..._messages.get(threadId)];
    }
    currentThreadMessages.push(message);
    _messages.set(threadId, currentThreadMessages);

    _threads.set(threadId, message);

    if(_currentThreadId !== threadId){
        _unreadThreads.add(threadId);
    }
}

function setCurrentThreadId(threadId){
    if(_currentThreadId === threadId){
        console.log('setCurrentThreadId false. threadId:' + threadId);
        return false;
    }
    _currentThreadId = threadId;
    _unreadThreads.delete(threadId);
    return true;
}

var ChatStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
    getAll: function() {
        return _messages;
    },
    getAllByThreadId: function(threadId) {
        return _messages.get(threadId);
    },
    getAllByCurrentThreadId: function(){
        return _messages.get(_currentThreadId);
    },
    getAllThread: function(){
        return _threads;
    },
    getCurrentThreadId: function(){
        return _currentThreadId;
    },
    getAllUnreadThread: function(){
        return _unreadThreads;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    console.log("AppDispatcher.register");
    let threadId;
    let text;
    switch(action.actionType) {
        case ChatConstants.CHAT_CREATE:
            text = action.text.trim();
            threadId = action.threadId.trim();
            if (text!=='' && threadId!=='') {
                create(text, threadId);
                ChatStore.emitChange();
            }
            break;
        case ChatConstants.CHAT_CLIECK_THREAD:
            let threadId = action.threadId;
            if(threadId !== '') {
                if(setCurrentThreadId(threadId)){
                    ChatStore.emitChange();
                }
            }
            break;
        case ChatConstants.CHAT_RECEIVE_MESSAGE:
            let message = action.message;
            receive(message);
            ChatStore.emitChange();
        default:
        // no op
    }
});

module.exports = ChatStore;
