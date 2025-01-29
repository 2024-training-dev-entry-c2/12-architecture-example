import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IState } from '../model/state.model';

@Injectable({
  providedIn: 'root',
})
export class StateFactory {
  state<T>(subject$: BehaviorSubject<T>): IState<T> {
    return {
      $: () => subject$.asObservable(),
      snapshot: () => this.immutabilize(subject$.getValue()),
      set: (value: T) => subject$.next(this.immutabilize(value)),
    };
  }

  private immutabilize<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }
}
