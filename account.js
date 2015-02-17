// Account 0.1.0
// This class handles accounts formatting and validation
//
// Author: Rafael Vidaurre

(function () {
  'use strict';
  // Dependencies
  // ------------
  var check = require('validator').check;

  // Account Class
  // =============
  var Account = function (accountAttrs) {
    // Constants
    // ---------
    var ACCOUNT_TYPES = ['checking', 'credit', 'credit_line', 'vista', 'saving'];
    var CURRENCIES = ['international', 'national'];

    // Private Properties
    // ------------------
    var _balance, _currency, _name, _type, _uid, _vanityUid;

    // Pattern matched for setters and getters
    var _patternMatch = function (setter, getter, arg) {
      if (typeof(arg) === 'undefined') {
        return getter();
      }
      return setter(arg);
    };

    // Setters and Getters
    // -------------------
    var _getBalance = function () {
      return _balance;
    };
    var _getCurrency = function () {
      return _currency;
    };
    var _getName = function () {
      return _name;
    };
    var _getType = function () {
      return _type;
    };
    var _getUid = function () {
      return _uid;
    };
    var _getVanityUid = function () {
      return _vanityUid;
    };

    var _setBalance = function (b) {
      if (isNaN(b)) {
        throw "Balance must be a valid number";
      }

      _balance = parseFloat(b);
    };
    var _setCurrency = function (c) {
      check(CURRENCIES, 'Invalid currency').contains(c);
      _currency = c;
    };
    var _setName = function (n) {
      check(n, 'Name can\'t be empty').notEmpty();
      if (typeof(n) !== 'string') {
        throw 'Name must be a string';
      }
      _name = n;
    };
    var _setType = function (t) {
      check(ACCOUNT_TYPES, 'Invalid account type').contains(t);
      _type = t;
    };
    var _setUid = function (u) {
      check(u, 'UID cannot be empty').notEmpty();
      if (typeof(u) !== 'string') {
        throw 'UID must be a string';
      }
      _uid = u;
    };
    var _setVanityUid = function (v) {
      check(v, 'Vanity UID cannot be empty').notEmpty();
      if (typeof(v) !== 'string') {
        throw 'Vanity UID must be a string';
      }
      _vanityUid = v;
    };

    // Public Methods
    // --------------
    this.balance = function (arg) {
      return _patternMatch(_setBalance, _getBalance, arg);
    };
    this.currency = function (arg) {
      return _patternMatch(_setCurrency, _getCurrency, arg);
    };
    this.type = function (arg) {
      return _patternMatch(_setType, _getType, arg);
    };
    this.uid = function (arg) {
      return _patternMatch(_setUid, _getUid, arg);
    };
    this.vanityUid = function (arg) {
      return _patternMatch(_setVanityUid, _getVanityUid, arg);
    };
    this.name = function (arg) {
      return _patternMatch(_setName, _getName, arg);
    };

    // Receives an object and sets properties from it
    this.set = function (obj) {
      if (typeof(obj.uid) !== 'undefined') {
        _setUid(obj.uid);
      }
      if (typeof(obj.vanityUid) !== 'undefined') {
        _setVanityUid(obj.vanityUid);
      }
      if (typeof(obj.vanity_uid) !== 'undefined') {
        _setVanityUid(obj.vanity_uid);
      }
      if (typeof(obj.name) !== 'undefined') {
        _setName(obj.name);
      }
      if (typeof(obj.type) !== 'undefined') {
        _setType(obj.type);
      }
      if (typeof(obj.type_name) !== 'undefined') {
        _setType(obj.type);
      }
      if (typeof(obj.typeName) !== 'undefined') {
        _setType(obj.type);
      }
      if (typeof(obj.currency) !== 'undefined') {
        _setCurrency(obj.currency);
      }
      if (typeof(obj.balance) !== 'undefined') {
        _setBalance(obj.balance);
      }
    };

    // Returns a formatted object literal
    this.build = function () {
      var balance = _getBalance();
      var currency = _getCurrency();
      var name = _getName();
      var type = _getType();
      var uid = _getUid();
      var vanityUid = _getVanityUid();

      var errMsg = 'Not all attributes have been set.';

      // Validations
      check(balance, errMsg).notNull().notEmpty();
      check(currency, errMsg).notNull().notEmpty();
      check(type, errMsg).notNull().notEmpty();
      check(uid, errMsg).notNull().notEmpty();
      check(name, errMsg).notNull().notEmpty();
      check(vanityUid, errMsg).notNull().notEmpty();

      return {
        'balance': balance,
        'currency': currency,
        'name': name,
        'type_name': type,
        'uid': uid,
        'vanity_uid': vanityUid,
      };
    };

    // Aliases
    this.typeName = this.type;
    this.vanity = this.vanityUid;
    this.UID = this.uid;

    if (typeof(accountAttrs) === 'object') {
      this.set(accountAttrs);
    }
  };

  module.exports = Account;
}).call(this);