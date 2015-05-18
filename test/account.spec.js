var MOCKUP, assert, Account;

assert = require('chai').assert;
Account = require('../account');

MOCKUP = {
  'good': {
    'name': 'Cuenta Corriente',
    'kind': 'checking',
    'currency': 'national',
    'balance': 449086,
    'number': '000067899946'
  },
  'badKey': {
    'balance': 449086,
    'currency': 'national',
    'name': 'Cuenta Corriente',
    'kind': 'checking',
    'uid': '000067899946'
  },
  'badValue': {
    'balance': 449086,
    'currency': 'national',
    'name': 'Cuenta Corriente',
    'kind': 'asdf',
    'number': '000067899946'
  },
  'missingValue': {
    'balance': 449086,
    'currency': 'national',
    'name': 'Cuenta Corriente',
    'number': '000067899946'
  }
};

describe('Module Account', function () {
  describe('Set object', function () {
    it ('should throw if a key is not properly set.', function () {
      var fn = function () {
        var acc = new Account(MOCKUP.badKey);
      };
      assert.throws(fn, Error);
    });

    it ('should throw if value is not properly set.', function () {
      var fn = function () {
        var acc = new Account(MOCKUP.badValue);
        acc.build();
      };
      assert.throws(fn, Error);
    });

    it ('should throw if value is not properly set.', function () {
      var fn = function () {
        var acc = new Account(MOCKUP.missingValue);
        acc.build();
      };
      assert.throws(fn, Error);
    });

    it ('should set missing property and does not throw', function () {
      var fn = function () {
        var acc = new Account(MOCKUP.missingValue);
        acc.kind('checking');
        acc.build();
      };
      assert.doesNotThrow(fn, Error);
    });

    it ('should set all property of a new instance and does not throw', function () {
      var fn = function () {
        var acc = new Account();

        acc.name('Cuenta Corriente');
        acc.kind('checking');
        acc.currency('national');
        acc.balance(449086);
        acc.number('000067899946');

        acc.build();
      };
      assert.doesNotThrow(fn, Error);
    });

    it ('should check if acc is an object.', function () {
      var acc = new Account(MOCKUP.good);
      assert.isObject(acc, 'Acc is an object.');
    });

    it ('should check if acc has property name.', function () {
      var acc = new Account(MOCKUP.good);
      assert.property(acc, 'name');
    });

    it ('should check if acc has property kind.', function () {
      var acc = new Account(MOCKUP.good);
      assert.property(acc, 'kind');
    });

    it ('should check if acc has property currency.', function () {
      var acc = new Account(MOCKUP.good);
      assert.property(acc, 'currency');
    });

    it ('should check if acc has property balance.', function () {
      var acc = new Account(MOCKUP.good);
      assert.property(acc, 'balance');
    });

    it ('should check if acc has property number.', function () {
      var acc = new Account(MOCKUP.good);
      assert.property(acc, 'number');
    });
  });
});
