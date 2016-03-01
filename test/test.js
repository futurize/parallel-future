var expect = require('expect');
var Task = require('data.task');
var parallel = require('../')(Task);


const _ = () => expect(true).toNotBe(false);
const eventuallyEqual = (expected, done) => res => {
  expect(res).toEqual(expected);
  done();
};

describe('#parallel-future', () => {

  function time (text, time) {
    time = time || 100;
    return new Task((reject, resolve) =>
      setTimeout(() => resolve(text), time));
  }

  function erroring (text) {
    return new Task((reject, resolve) =>
      setTimeout(() => reject(text), 100));
  }

  it('should run Futures in parallel', done => {
    parallel([ time(1)
             , time(2)
             , time(3)
             ]).fork(_, eventuallyEqual([1, 2, 3], done));
  });

  it('should fail if one Future fails', done => {
    parallel([ time(1)
             , erroring('Error')
             , time(3)
             ]).fork(eventuallyEqual('Error', done), _);
  });

  it('should keep the order of the result', done => {
    parallel([ time(1, 300)
             , time(2, 200)
             , time(3, 100)
             ]).fork(_, eventuallyEqual([1, 2, 3], done));
  });

  it('should work on an empty array', done => {
    parallel([]).fork(_, eventuallyEqual([], done));
  });
});
