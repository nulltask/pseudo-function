
var PseudoFunction = require('../');
var assert = require('assert');

describe('pseudo-function', function() {
  it('shold be a function', function() {
    assert('function' == typeof PseudoFunction);
  });

  var fn = new PseudoFunction(function() {
    setTimeout(function() {
      self.postMessage({ foo: 'bar' });
    });
    self.onmessage = function(e) {
      if ('foo' == e.data) {
        self.postMessage({ bar: 'baz' });
      }
    };
  });

  describe('Worker', function() {
    it('should send message', function(done) {
      var worker = new Worker(fn);
      worker.addEventListener('message', function(e) {
        assert('bar' == e.data.foo);
        worker.removeEventListener('message', arguments.callee);
        worker.terminate();
        done();
      }, false);
    });

    it('should respond message', function(done) {
      var worker = new Worker(fn);
      worker.addEventListener('message', function(e) {
        assert('baz' == e.data.bar);
        worker.removeEventListener('message', arguments.callee);
        worker.terminate();
        done();
      });
      worker.postMessage('foo');
    });
  });

  describe('#toString()', function() {
    it('should return object URL', function() {
      var val = fn.toString();
      assert('blob:' == val.slice(0, 5));
    });
  });

  describe('#revoke()', function() {
    it('should revoke object URL', function() {
      fn.revoke();
      assert(null == fn.objectURL);
    });
  });
});
