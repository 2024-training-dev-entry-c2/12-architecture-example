import { Observable } from "rxjs"

export interface Istate<T> {
  $: () => Observable<T>;
  valueState: () => T;
  changeState: (value: T) => void;
}