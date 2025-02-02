import { Observable } from 'rxjs';

export interface IState<T> {
  $: () => Observable<T>;
  snapshot: () => T;
  set: (value: T) => void;
}
