import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";

import { DeleteDishService } from "../../infrastructure/services/delete-dish.service";
import { IDishes } from "../../public-api";

@Injectable({
    providedIn: 'root'
})

export class DeleteDishUseCase{
    private readonly _service = inject(DeleteDishService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    dish$(): Observable<IDishes[]> {
        return this._state.dishes.dish.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
      }

      
    execute(dish: IDishes): void {
        this.subscriptions.add(
            this._service.deleteDish(dish)
                .pipe(
                    tap(() => {
                        const currentDishs = this._state.dishes.dish.snapshot();
                        const filteredDishes = currentDishs.filter(d => d.id !== dish.id);
                        this._state.dishes.dish.set(filteredDishes);
                    })
                )
                .subscribe()
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


}