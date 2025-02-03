import { inject, Injectable } from "@angular/core";
import { tap, Subscription, Observable, switchMap, of } from "rxjs";
import { IDish } from "../domain/model/dish.model";
import { State } from "../domain/state";
import { UpdateDishService } from "../infrastructure/services/update-dish.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateDishUseCase {
    private readonly _service = inject(UpdateDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number, updatedDish: Partial<IDish>): Observable<void> {
        return this._service.update(id, updatedDish).pipe(
            tap(updatedDish => {
                console.log(`Plato actualizado: ${updatedDish}`);

                const currentDishes = this._state.dishes.dish.snapshot();

                const updatedDishes = currentDishes.map(dish =>
                    dish.id === id ? { ...dish, ...updatedDish } : dish
                );

                this._state.dishes.dish.set(updatedDishes);
            }),
            switchMap(() => of(void 0)) 
        );
    }
}
