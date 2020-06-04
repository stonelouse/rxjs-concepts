import { range, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

export function main() {
  let observable: Observable<string> = range(0, 10).pipe(
    filter((n: number) => n % 2 === 0),
    map((n: number) => `${n} is even`),
    map((s: string) => `${s}!`)
  );
  observable.subscribe(console.log);
}
