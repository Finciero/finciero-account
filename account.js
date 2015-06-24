'use strict';

var ACCOUNT_TYPE, CURRENCIES, VALID_KEYS, check, _, checkKeys, checkCurrency, checkKind, isString;

check = require('validator').check;
_ = require('lodash');

ACCOUNT_TYPE = ['checking', 'credit_card', 'credit_line', 'vista', 'saving'];
CURRENCIES = ['international', 'national'];
VALID_KEYS = ['number', 'name', 'kind', 'currency', 'balance'];

isString = function (str, errorMsg) {
  if (typeof str !== 'string') {
    throw new Error(errorMsg);
  }
  return true;
};

checkKeys = function (obj) {
  _.every(obj, function (value, key) {
    if (!_.includes(VALID_KEYS, key)) {
      throw new Error('Key \'' + key + '\' is not valid.');
    }

    return true;
  });
  return true;
};

checkCurrency = function (currency) {
  var noCurrency = _.includes(CURRENCIES, currency);

  if (!noCurrency) {
    throw new Error('Invalid currency.');
  }

  return true;
};

checkKind = function (type) {
  var noType = _.includes(ACCOUNT_TYPE, type);

  if (!noType) {
    throw new Error('Invalid account type.');
  }

  return true;
};

/**
 * Module to check and format account data
 * @param {Object} accObj Object with accounts data.
 *
 * Object example:
 * {
 *  'name': 'Cuenta Corriente',
 *  'kind': 'checking',
 *  'currency': 'national',
 *  'balance': 449086,
 *  'number': '000067899946'
 * }
 */
function Account (accObj) {
  if (typeof accObj === 'undefined') {
    return this;
  }

  checkKeys(accObj);
  this.number(accObj.number);
  this.name(accObj.name);
  this.kind(accObj.kind);
  this.currency(accObj.currency);
  this.balance(accObj.balance);

}

Account.prototype.build = function () {
  var number, name, kind, currency, balance;

  number = this.number();
  isString(number, 'Invalid number variable type.');
  check(number, 'Number cannot be empty').notNull().notEmpty();

  name = this.name();
  isString(name, 'Invalid name variable type.');
  check(name, 'Name cannot be empty').notNull().notEmpty();

  kind = this.kind();
  isString(kind, 'Invalid kind variable type.');
  check(kind, 'Kind cannot be empty').notNull().notEmpty();
  checkKind(kind);

  currency = this.currency();
  isString(currency, 'Invalid currency variable type.');
  check(currency, 'Currency cannot be empty').notNull().notEmpty();
  checkCurrency(currency);

  balance = this.balance();
  check(balance, 'Balance cannot be empty').notNull().notEmpty().isFloat();

  return {
    'name': name,
    'kind': kind,
    'currency': currency,
    'balance': balance,
    'number': number
  };
};

Account.prototype.balance = function (balance) {
  if (typeof balance !== 'undefined') {
    this._balance = parseFloat(balance);
  }
  return parseFloat(this._balance);
};

Account.prototype.currency = function (currency) {
  if (typeof currency !== 'undefined') {
    this._currency = currency;
  }
  return this._currency;
};

Account.prototype.kind = function (kind) {
  if (typeof kind !== 'undefined') {
    this._kind = kind;
  }
  return this._kind;
};

Account.prototype.name = function (name) {
  if (typeof name !== 'undefined') {
    this._name = name;
  }
  return this._name;
};

Account.prototype.number = function (number) {
  if (typeof number !== 'undefined') {
    this._number = number;
  }
  return this._number;
};

module.exports = Account;
