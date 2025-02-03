import { inject, Injectable } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { State } from "../domain/state";
import { IDish } from "../domain/model/dish.model";
import { GetAllDishesService } from "../infrastructure/services/get-all-dishes.service";

@Injectable({
    providedIn: 'root'
})
export class GetAllDishesUseCase {
    private readonly _service = inject(GetAllDishesService);
    private readonly _state = inject(State);
    private subscriptions: Subscription

    //#region Observables
    dish$(): Observable<IDish[]> {
        return this._state.dishes.showDishes.$() as Observable<IDish[]>;
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
                    tap(this._state.dishes.showDishes.set)
                )
                .subscribe()
        )
    }
    //#endregion
}