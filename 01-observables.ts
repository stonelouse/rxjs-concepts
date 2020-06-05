import { Observable } from "rxjs";

// Observable.create is meanwhile deprecated; use constructor instead.
const observable1 = Observable.create(function subscribe(observer) {
  /* 
      subscribe function 
      ... will only be executed when the Observable is subscribed
      next() provides a value to the observer
      ... synchronously
  */
  observer.next(1);
  //  ... or asynchronously
  setTimeout(() => {
    observer.next(2);
  }, 1000);
  /*
      complete() does not send a value,
      ... it only signals completion of the Observable
   */
  setTimeout(() => {
    observer.complete();
  }, 2000);
  /*
      after completion signal is emitted,
      ... nothing else can be emitted afterwards.
   */
  setTimeout(() => {
    // won't be emitted
    observer.next(42);
  }, 3000);
});

const observable2 = Observable.create(function subscribe(observer) {
  observer.next("A"); // emit value synchronously
  setTimeout(() => {  // emit value asynchronously
    observer.next("B");
  }, 1000);
  /*
      error() emits an error,
      ... nothing else can be emitted afterwards.
   */
  setTimeout(() => {
    observer.error(new Error("error when processing value 2"));
  }, 2000);
  setTimeout(() => {
    // won't be emitted
    observer.next("C");
  }, 3000);
  setTimeout(() => {
    // won't be emitted
    observer.complete();
  }, 4000);
});

export function main() {
  observable1.subscribe(
    value => console.log(value),
    reason => console.error(reason),
    () => console.log("observable1 completed")
  );

  observable2.subscribe(
    value => console.log(value),
    reason => console.error(reason),
    () => console.log("observable2 completed")
  );
}
