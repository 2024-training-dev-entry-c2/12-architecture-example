import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Istate } from '../model/state.model';

@Injectable({providedIn: 'root'})


export class StateFacotory {

  stateFunctions<T>(subject$: BehaviorSubject<T>):Istate<T>{
    return{
      $: () => subject$.asObservable(),
      valueState: () => this.immutabilize(subject$.getValue()) ,
      changeState: (value: T) => subject$.next(this.immutabilize(value))
    }
  }

  private immutabilize<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

}
