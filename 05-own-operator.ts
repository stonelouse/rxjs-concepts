import { Observable, Subscriber, from } from "rxjs";

function square(input: Observable<number>) {
  let output: Observable<number> = new Observable(function(
    subscriber: Subscriber<number>
  ) {
    input.subscribe({
      next: (v: number) => subscriber.next(v * v),
      error: (reason: unknown) => subscriber.error(reason),
      complete: () => subscriber.complete()
    });
  });
  return output;
}

export function main() {
  let input: Observable<number> = from([1, 2, 3, 4]);
  input.subscribe(v => console.log("input:", v));

  let output: Observable<number> = square(input);
  output.subscribe(v => console.log("output:", v));
}
