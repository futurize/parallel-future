parallel-future
===============

[![build status](https://img.shields.io/travis/futurize/parallel-future/master.svg?style=flat-square)](https://travis-ci.org/futurize/parallel-future)
[![npm version](https://img.shields.io/npm/v/parallel-future.svg?style=flat-square)](https://www.npmjs.com/package/parallel-future)
[![codecov.io](https://codecov.io/github/futurize/parallel-future/coverage.svg?branch=master)](https://codecov.io/github/futurize/parallel-future?branch=master)

> Run Futures in parallel


## Example

```js
const Task = require('data.task');
const parallel = require('parallel-future')(Task);


const parallelRequests = parallel([ getUsers, getPosts ]);

parallelRequests.fork(onRejected, (results) => {
  console.log('Users', results[0]);
  console.log('Posts', results[1]);
});
```

## Why not `R.sequence(Task.of)`?

Because it only appears to run the `Futures` in parallel.
Run the tests and see for your self.

```js

  describe('runs parallel', () => {
    it('should run Futures in parallel', done => {
      console.time('parallel-future');
      parallel([ time(1)
               , time(2)
               , time(3)
               ]).fork(_, eventuallyEqual([1, 2, 3], () => { console.timeEnd('parallel-future'); done() }));
    });

    it('compared to R.sequence (only appears to be parallel)', done => {
      console.time('sequence');
      R.sequence(Task.of)
              ([ time(1)
               , time(2)
               , time(3)
               ]).fork(_, eventuallyEqual([1, 2, 3], () => { console.timeEnd('sequence'); done() }));
    });
  });
```

Output:

```bash
    runs parallel
parallel-future: 106ms
      ✓ should run Futures in parallel (106ms)
sequence: 315ms
      ✓ compared to R.sequence (only appears to be parallel) (316ms)
```

## API

### `parallelFuture :: Future -> [Future a] -> Future [a]`


## License

MIT © [stoeffel](https://stoeffel.github.io)
