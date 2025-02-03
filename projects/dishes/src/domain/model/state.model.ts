import { Observable } from "rxjs";

export interface IState<T> {
    $: () => Observable<T>; // metodo para retornar un observable con valor del estado $simbolo asignado a los observables
    snapshot: () => T; // valor actual del estado sin ser observable
    set: (value: T) => void; //metodo para asignar valor al estado
}