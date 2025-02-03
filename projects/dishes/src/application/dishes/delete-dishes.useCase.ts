import { inject, Injectable } from "@angular/core";
import { DeleteDishesService } from "../../infrastructure/services/delete-dishes.service";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeleteDishUseCase{
    private readonly _service = inject(DeleteDishesService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id: string): void {
        if (!id) {
            console.error('No se proporcionó un ID válido para eliminar el plato.');
            return;
        }

        this.subscriptions.add(
            this._service.deleteDish(id)
            .pipe(
                tap(() => {
                    setTimeout(() => {
                        const dishes = this._state.dishes.dish.snapshot();
                        const newDishes = dishes.filter(dish => dish.id !== id);
                        this._state.dishes.dish.set(newDishes);
                    }, 500);
                })
            ).subscribe()
        );
    }
}