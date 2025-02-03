import { inject, Injectable } from "@angular/core";
import { DeleteDishService } from "../infrastructure/services/delete-dish.service";
import { State } from "../domain/state";
import { Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeleteDishUseCase {
    private readonly _service = inject(DeleteDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(dishId: number) {
        this.subscriptions.add(
            this._service.execute(dishId).pipe(
                tap(result => {
                    const currentDishes = this._state.dishes.showDishes.snapshot();
                    this._state.dishes.showDishes.set(currentDishes.filter(d => d.id !== dishId));
                })
            ).subscribe()
        );
    }
    //#endregion
}