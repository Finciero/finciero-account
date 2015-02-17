Account
=======

This class handles validation and formatting of bank accounts to be
used in Yakuza scripts

Requiring
=========

```javascript
Account = require('./account');
account = new Account() // Instance new account
```

Seters & getters
----------------
Setters and getters are functions with pattern matching, they behave as setters when an argument
is given, otherwise they behave as getters.

**Balance**

Must be an Int or a Float

```javascript
account.balance(103);
```

**Currency**

Is a string, must be one of the following:

- international
- national

```javascript
account.currency('international');
```

**Name**

Must be a non-empty string

```javascripts
account.name('Super account');
```

**Type**

String, defaults to _normal_ and must be one of the following:

- checking
- credit
- credit_line
- vista

```javascript
account.type('credit_line');
```


**Uid and Vanity Uid**

Must be a non-empty string

```javascript
account.vanity('1234'); // This works
account.vanityUid('1234'); // This alias works too

account.uid('432143211234');
```

Building the account
--------------------

Once all attributes are set, you can use the `build` method to get a formatted, ready-to-go account
object


```javascript
account.build(); // Returns {'name': 'Foo', 'balance': 0, ... }
```
