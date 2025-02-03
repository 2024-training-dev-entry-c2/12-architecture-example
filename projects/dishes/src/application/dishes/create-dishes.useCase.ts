import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dishes.model";
import { ModalComponent } from "shared";
import { CreateDishesService } from "../../infrastructure/services/create-dishes.service";

@Injectable({
    providedIn: 'root'
})
export class CreateDishsUseCase {
    private readonly _service = inject(CreateDishesService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(dish: IDish, modal: ModalComponent): void {
        this.subscriptions.add(
            this._service.createDish(dish).
            pipe(
                tap((dish) => {
                    const dishes = this._state.dishes.dish.snapshot();
                    this._state.dishes.dish.set([...dishes, dish]);
                    modal.toggle();
                }),
            ).subscribe()
        );
    }
}