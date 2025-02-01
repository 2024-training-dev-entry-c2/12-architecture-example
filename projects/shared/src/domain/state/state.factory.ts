import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IState } from "../model/state.model";

@Injectable({
    providedIn: "root"
})
export class StateFactory {
    state<T>(subject$: BehaviorSubject<T>): IState<T> {
        return {
            $: () => subject$.asObservable(),
            snapshot: () => subject$.getValue(),
            set: (value: T) => subject$.next(value)
        }
    }

    private inmutabilize<T>(value: T): T {
        return JSON.parse(JSON.stringify(value));
    }
}