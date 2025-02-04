import { inject, Injectable } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { IDish } from "../domain/model/dish.model";
import { State } from "../domain/state";
import { GetDishesService } from "../infrastructure/services/get-dishes.service";

@Injectable({
    providedIn: 'root'
})
export class GetAllDishesUseCase {
    private readonly _service = inject(GetDishesService);
    private readonly _state = inject(State);
    private subscriptions: Subscription

    //#region Observables
    dish$(): Observable<IDish[]> {
        return this._state.orders.showDishes.$() as Observable<IDish[]>;
    }
    //#endregion

    //#region Public Methods
    initSubscriptions() {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions() {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
        this.subscriptions.add(
            this._service.execute()
                .pipe(
                    tap(result => this._state.orders.showDishes.set(result))
                )
                .subscribe()
        )
    }
    //#endregion
}