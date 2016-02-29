// parallelFuture :: Future -> [Future a] -> Future [a]
function parallelFuture (Future) {
  return function (futures) {
    var n = futures.length;

    return new Future(function(reject, resolve) {
      var resolved = 0;
      var results = [];
      function resolvedYet(result) {
        resolved = resolved + 1;
        results.push(result);
        if (resolved === n) return resolve(results);
      }
      for (var i = 0; i < n; i++) {
        futures[i].fork(reject, resolvedYet);
      }
    });
  }
}

module.exports = parallelFuture;
