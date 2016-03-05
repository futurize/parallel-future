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

## API

### `parallelFuture :: Future -> [Future a] -> Future [a]`


## License

MIT © [stoeffel](https://stoeffel.github.io)
