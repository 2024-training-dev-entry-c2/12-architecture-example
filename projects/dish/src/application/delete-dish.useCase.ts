import { inject, Injectable } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { DeleteDishService } from "../infrastructure/services/delete-dish.service";

@Injectable({
    providedIn: 'root'
})

export class DeleteDishUseCase {
    private readonly _service = inject(DeleteDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: number): void {
        this.subscriptions.add(
            this._service.delete(id)
                .pipe(
                    tap(response => {
                        console.log(`Dish eliminado: ${response}`);

                        const currentDishes = this._state.dishes.dish.snapshot();
                        
                        const updatedDishes = currentDishes.filter(dish => dish.id !== id);
                        
                        this._state.dishes.dish.set(updatedDishes);
                    })
                )
                .subscribe()
        );
    }
}
