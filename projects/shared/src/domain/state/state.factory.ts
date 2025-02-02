import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IState } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class StateFactory {
  state<T>(subject$: BehaviorSubject<T>): IState<T> {
    return {
      $: () => subject$.asObservable(),
      snapshot: () => this.inmmutabilize(subject$.getValue()),
      set: (value: T) => subject$.next(this.inmmutabilize(value)),
    };
  }

  private inmmutabilize<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }
}
