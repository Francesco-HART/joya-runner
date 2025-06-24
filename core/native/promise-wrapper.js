function createWrappedPromise(eventLoop) {
  const OriginalPromise = globalThis.Promise;

  return class WrappedPromise {
    constructor(executor) {
      this._internal = new OriginalPromise((resolve, reject) => {
        executor(
          (val) => {
            eventLoop.queueMicrotask(() => {
              resolve(val);
            });
          },
          (err) => {
            eventLoop.queueMicrotask(() => {
              reject(err);
            });
          }
        );
      });
    }

    then(onFulfilled, onRejected) {
      return this._internal.then(onFulfilled, onRejected);
    }

    catch(onRejected) {
      return this._internal.catch(onRejected);
    }

    finally(onFinally) {
      return this._internal.finally(onFinally);
    }

    // Pour que await continue de fonctionner
    get [Symbol.toStringTag]() {
      return "Promise";
    }

    static resolve(value) {
      return OriginalPromise.resolve(value);
    }

    static reject(reason) {
      return OriginalPromise.reject(reason);
    }

    static all(iterable) {
      return OriginalPromise.all(iterable);
    }

    static race(iterable) {
      return OriginalPromise.race(iterable);
    }
  };
}

module.exports = { createWrappedPromise };
