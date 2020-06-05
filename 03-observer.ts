import { Observable, Subscriber } from "rxjs";

const observer = {
  next: (value: number) => console.log(value),
  error: (reason: unknown) => console.error(reason),
  complete: () => console.log("completed")
};

export function main() {
  // Observable.create is meanwhile deprecated; use constructor instead.
  Observable.create((subscriber: Subscriber<number>) =>
    subscriber.next(42)
  ).subscribe(observer);
  Observable.create((subscriber: Subscriber<unknown>) =>
    subscriber.error(new Error("666"))
  ).subscribe(observer);
  Observable.create((subscriber: Subscriber<unknown>) =>
    subscriber.complete()
  ).subscribe(observer);
}
