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

let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let HNConstants = require('../constants/HNConstants');
let assign = require('object-assign');

let {UserDO} = require('../utils/Domain');

let APIUtils = require('../utils/APIUtils');

let CHANGE_EVENT = 'change';
let USER_CHANGE_EVENT = 'user_change';

let API_ROOT = 'https://api.github.com/users/';
let allUserIds = new Set(['gaearon']);

let userMap = new Map();

function setUser(JSON){
    let userDO = new UserDO(JSON);
    userMap.set(userDO.id, userDO);
}

function addUser(userId){
    allUserIds.add(userId);
}

let HNStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
    fetchJSON: function() {
        APIUtils.fetchURL('https://api.github.com/users/gaearon', this.updateJSON);
    },
    getJSON: function() {
        return result;
    },
    updateJSON: function(JSON){
        result = JSON;
        HNStore.emitChange();
    },
    fetchUser: function(userId){
        APIUtils.fetchURL(`${API_ROOT}${userId}`, this.setUserWithEmit);
    },
    setUserWithEmit: function(JSON){
        if(typeof JSON !== 'undefined'){
            setUser(JSON);
            HNStore.emitChange();
        }
    },
    getUser: function(userId){
        return userMap.get(userId);
    },
    getUserIds: function () {
        let userIds = [...allUserIds];
        return userIds;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    emitUserChange: function() {
        this.emit(USER_CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addUserChangeListener: function(callback) {
        this.on(USER_CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeUserChangeListener: function(callback) {
        this.removeListener(USER_CHANGE_EVENT, callback);
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
    switch(action.actionType) {
        case HNConstants.HN_USER_CHANGE:
            let userId = action.userId;
            addUser(userId);
            HNStore.emitUserChange();
            break;
        default:
        // no op
    }
});

module.exports = HNStore;
