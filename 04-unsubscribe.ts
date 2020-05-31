import {
  Observable,
  Subscriber,
  Unsubscribable,
  Observer,
  Subscription
} from "rxjs";

export function main() {
  console.log("Todo");
  const intervalObservable: Observable<number> = new IntervalObservable();

  const subscriptionA: Subscription = intervalObservable.subscribe(
    new IdentifyableObserver("A")
  );
  const subscriptionB: Subscription = intervalObservable.subscribe(
    new IdentifyableObserver("B")
  );
  const subscriptionC: Subscription = intervalObservable.subscribe(
    new IdentifyableObserver("C")
  );
  setTimeout(() => subscriptionA.unsubscribe(), 6000);
  setTimeout(() => subscriptionB.unsubscribe(), 4000);
  setTimeout(() => subscriptionC.unsubscribe(), 5000);

  setTimeout(() => {
    const subscriptionD: Subscription = intervalObservable.subscribe(
      new IdentifyableObserver("D")
    );
    setTimeout(() => subscriptionD.unsubscribe(), 3000);
  }, 7000);
}

class IntervalObservable extends Observable<number> {
  private intervalId: number = NaN;
  private counter: number = 0;
  private subscribers: Subscriber<number>[] = [];

  constructor() {
    super(
      (subscriber: Subscriber<number>): Unsubscribable => {
        console.log("subscribe", this.subscribers.length);
        this.subscribers.push(subscriber);
        if (isNaN(this.intervalId)) {
          this.intervalId = setInterval(() => {
            this.subscribers.forEach(subscriber =>
              subscriber.next(this.counter)
            );
            this.counter += 1;
          }, 1000);
          console.log("interval started", this.intervalId);
        }
        return {
          unsubscribe: () => {
            this.subscribers = this.subscribers.filter(
              item => item != subscriber
            );
            console.log("unsubscribe", this.subscribers.length);
            if (this.subscribers.length === 0) {
              console.log("interval cleared");
              clearInterval(this.intervalId);
              this.intervalId = NaN;
              this.counter = 0;
            }
          }
        };
      }
    );
  }
}

class IdentifyableObserver implements Observer<number> {
  constructor(private readonly Id: string) {}
  next(value: number) {
    console.log(this.Id, value);
  }
  error(reason: unknown) {
    console.error(this.Id, reason);
  }
  complete() {
    console.log(this.Id, "on complete");
  }
}
