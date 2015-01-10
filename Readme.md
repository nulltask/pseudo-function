
# pseudo-function

[![Build Status](https://travis-ci.org/nulltask/pseudo-function.svg)](https://travis-ci.org/nulltask/pseudo-function)

Turn the function object to URL object. This library is useful to create web workers with inline function.

## Example

```js
var pfn = require('pseudo-function');

var fn = pfn(function() {
  setInterval(function() {
    self.postMessage(new Date());
  }, 1000);
});

var worker = new Worker(fn);

worker.onmessage = function(e) {
  console.log(e.data);
};

setTimeout(function() {
  worker.terminate();
  fn.revoke();  // clean up pseudo function
  console.log('terminated');
}, 5000);
```

## Installation

    $ npm install pseudo-function

## License

MIT
