var expect = require('expect');
var Task = require('data.task');
var parallel = require('../');


const _ = () => expect(true).toNotBe(false);
const eventuallyEqual = (expected, done) => res => {
  expect(res).toEqual(expected);
  done();
};

describe('#parallel-future', () => {

  function time (text, cb) {
    return new Task((reject, resolve) =>
      setTimeout(() => resolve(text), 100));
  }

  function erroring (text, cb) {
    setTimeout(() => cb(text), 100);
  }

  it('should run Futures in parallel', done => {
    console.time()
    parallel([ time(1)
             , time(2)
             , time(3)
             ]).fork(_, eventuallyEqual([1, 2, 3], () =>{ console.timeEnd(); done() }));
  });

});
