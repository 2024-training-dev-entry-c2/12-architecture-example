import { inject, Injectable } from "@angular/core";
import { UpdateDishService } from "../infrastructure/services/update-dish.service";
import { IDish } from "../domain/model/dish.model";
import { Subscription, Observable, tap, delay, finalize } from "rxjs";
import { State } from "../domain/state";

@Injectable({
    providedIn: 'root'
})
export class UpdateDishUseCase {
    private readonly _service = inject(UpdateDishService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    //#region Observables
    message$(): Observable<string> {
        return this._state.dishes.message.$();
    }

    currentDish$(): Observable<IDish> {
        return this._state.dishes.currentDish.$()
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(dish: IDish) {
        this.subscription.add(
            this._service.execute(dish.id, dish)
                .pipe(
                    tap(result => {
                        this._state.dishes.message.set('Menú actualizado con éxito');
                        const currentDish = this._state.dishes.showDishes.snapshot();
                        const updatedDishes = currentDish.map(d => d.id === result.id ? result : d);
                        this._state.dishes.showDishes.set(updatedDishes);
                    }),
                    delay(2000),
                    finalize(() => {
                        this._state.dishes.currentDish.set(null);
                        this._state.dishes.open.set(false);
                        this._state.dishes.message.set('');
                    })
                ).subscribe()
        )
    }

    selectDish(dishId: number) {
        const currentDish = this._state.dishes.showDishes.snapshot().find(d => d.id === dishId);
        this._state.dishes.currentDish.set(currentDish);
    }
    //#endregion
}
