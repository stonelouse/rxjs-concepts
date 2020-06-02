import { Observable, Subscriber, from } from "rxjs";
import { map } from "rxjs/operators";

function square(input: Observable<number>) {
  let output: Observable<number> = new Observable(function(
    subscriber: Subscriber<number>
  ) {
    console.log("entering subscribe");
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
  console.log("before input subscribe");
  input.subscribe(v => console.log("input:", v));

  console.log("before output subscribe");
  let output: Observable<number> = square(input);
  output.subscribe(v => console.log("output:", v));

  let squared: Observable<number> = input.pipe(map((v: number) => v * v));
  console.log("before squared subscribe");
  squared.subscribe(v => console.log("squared", v));
}
