import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ListDishService } from "../../infrastructure/services/list-dish.service";
import { IDish } from "../../domain/model/dishes.model";

@Injectable({
    providedIn: 'root'
})
export class ListDishesUseCase {
    private readonly _service = inject(ListDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Observables
    dish$(): Observable<IDish[]> {
        return this._state.dishes.dish.$();
    }
    //#endregion

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    loadDishes(idMenu: number): void {
        this.subscriptions.add(
            this._service.listDishes(idMenu).pipe(
                tap(result => {
                    this._state.dishes.dish.set(result);
                })
            ).subscribe()
        );
    }
}
