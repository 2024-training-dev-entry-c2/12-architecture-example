import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dishes.model";
import { ModalComponent } from "shared";
import { UpdateDishesService } from "../../infrastructure/services/update-dishes.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateDishesUseCase {
    private readonly _service = inject(UpdateDishesService);
    private readonly _state = inject(State);
    private subscription: Subscription;

    currentDish$(): Observable<IDish> {
        return this._state.dishes.currentDish.$();
    }

    initSubscriptions(): void {
        this.subscription = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscription.unsubscribe();
    }

    execute(dish: IDish, modal: ModalComponent): void {
        this.subscription.add(
            this._service.updateDish(dish)
            .pipe(
                tap((updateDish) => {
                    const dishes = this._state.dishes.dish.snapshot();
                    const newDishes = dishes.map(d => d.id === updateDish.id ? updateDish : d);
                    this._state.dishes.dish.set(newDishes);
                    modal.toggle();
                    this._state.dishes.currentDish.set(null);
                })
            ).subscribe()
        );
    }

    selectDish(id: string): void {
        const currentDish = this._state.dishes.dish.snapshot().find(dish => dish.id === id);
        this._state.dishes.currentDish.set(currentDish);
    }
}