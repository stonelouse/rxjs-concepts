import { Observable, from } from "rxjs";

Observable.prototype.myMap = function(mapFn) {
  let source = this;

  let output = new Observable(function subscribe(subscriber) {
    source.subscribe(
      v => subscriber.next(mapFn(v)),
      reason => subscriber.error(reason),
      () => subscriber.complete()
    );
  });

  return output;
};

export function main() {
  let observable = from([1, 2, 3]).myMap(v => v * 2);
  observable.subscribe(v => console.log(v));
}
