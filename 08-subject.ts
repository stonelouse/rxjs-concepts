import { interval, Observable, Observer, Subscription, Subject } from "rxjs";

class IntervalObserver implements Observer<number> {
  constructor(private label: string) {}

  next(value: number) {
    console.log(`${this.label}:`, value);
  }

  error(reason: unknown) {
    console.error(`${this.label}:`, reason);
  }

  complete() {
    console.log(`${this.label}:`, "completed");
  }
}

export function main() {
  //demonstrateObservablesUnicastNature();
  //demonstrateSubjectsMulticastNature();
  demonstrateSubjectsAreAlsoObservers();
}

function demonstrateSubjectsAreAlsoObservers() {
  const intervalObservable: Observable<number> = interval(100);
  const intervalSubject: Subject<number> = new Subject();
  const subjectsSubscript: Subscription = intervalObservable.subscribe(
    intervalSubject
  );

  let subscriptA: Subscription;
  let subscriptB: Subscription;

  setTimeout(() => {
    subscriptA = intervalSubject.subscribe(new IntervalObserver("ObserverA"));
  }, 0);
  setTimeout(() => {
    subscriptB = intervalSubject.subscribe(new IntervalObserver("ObserverB"));
  }, 500);
  setTimeout(() => {
    subscriptA.unsubscribe();
    subscriptB.unsubscribe();
    subjectsSubscript.unsubscribe();
  }, 1000);
  // same output as demonstrateSubjectsMulticastNature()
}

function demonstrateSubjectsMulticastNature() {
  const intervalObservable: Observable<number> = interval(100);
  const intervalSubject: Subject<number> = new Subject();
  const subjectsSubscript: Subscription = intervalObservable.subscribe(
    (value: number) => intervalSubject.next(value)
  );

  let subscriptA: Subscription;
  let subscriptB: Subscription;

  setTimeout(() => {
    subscriptA = intervalSubject.subscribe(new IntervalObserver("ObserverA"));
  }, 0);
  setTimeout(() => {
    subscriptB = intervalSubject.subscribe(new IntervalObserver("ObserverB"));
  }, 500);
  setTimeout(() => {
    subscriptA.unsubscribe();
    subscriptB.unsubscribe();
    subjectsSubscript.unsubscribe();
  }, 1000);
  // Observer A: 0
  // Observer A: 1
  // Observer A: 2
  // Observer A: 3
  // Observer A: 4
  // Observer B: 4 !!!!
  // Observer A: 5
  // Observer B: 5
  // Observer A: 6
  // Observer B: 6
  // Observer A: 7
  // Observer B: 7
  // Observer A: 8
  // Observer B: 8
}

function demonstrateObservablesUnicastNature() {
  const intervalObservable: Observable<number> = interval(100);

  let subscript1: Subscription;
  let subscript2: Subscription;

  setTimeout(() => {
    subscript1 = intervalObservable.subscribe(
      new IntervalObserver("Observer1")
    );
  }, 0);
  setTimeout(() => {
    subscript2 = intervalObservable.subscribe(
      new IntervalObserver("Observer2")
    );
  }, 500);
  setTimeout(() => {
    subscript1.unsubscribe();
    subscript2.unsubscribe();
  }, 1000);
  // Observer 1: 0
  // Observer 1: 1
  // Observer 1: 2
  // Observer 1: 3
  // Observer 1: 4
  // Observer 2: 0 !!!!
  // Observer 1: 5
  // Observer 2: 1
  // Observer 1: 6
  // Observer 2: 2
  // Observer 1: 7
  // Observer 2: 3
  // Observer 1: 8
}
