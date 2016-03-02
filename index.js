// parallelFuture :: Future -> [Future a] -> Future [a]
function parallelFuture (Future) {
  return function (futures) {
    var n = futures.length;

    if (n === 0) {
      return Future.of([]);
    }

    return new Future(function(reject, resolve) {
      var resolved = 0;
      var results = [];
      function resolvedYet(idx) {
        return function(result) {
          resolved = resolved + 1;
          results[idx] = result;
          if (resolved === n) return resolve(results);
        }
      }
      for (var i = 0; i < n; i++) {
        futures[i].fork(reject, resolvedYet(i));
      }
    });
  }
}

module.exports = parallelFuture;
