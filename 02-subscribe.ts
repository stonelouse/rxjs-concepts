import { Observable, Subscriber } from "rxjs";

let outer: number = 1;

const observable1: Observable<number> = Observable.create((subscriber: Subscriber<number>) => {
  let inner: number = 10;
  subscriber.next(outer++);
  subscriber.next(outer++);
  subscriber.next(inner++);
  subscriber.next(inner++);
});

export function main() {
  const func = (label:string) => (value: number) => console.log(`${label}: value=${value}, outer=${outer}`)
  observable1.subscribe(func('1st'));
  observable1.subscribe(func('2nd'));
  /*
  1st: value=1, outer=2
  1st: value=2, outer=3
  1st: value=10, outer=3
  1st: value=11, outer=3
  2nd: value=3, outer=4
  2nd: value=4, outer=5
  2nd: value=10, outer=5
  2nd: value=11, outer=5
   */
}
