import { Observable } from "rxjs";

export interface IState<T> {
  $: () => Observable<T>;//$ observable 
  snapshot: () => T;
  set: (value: T) => void;
}