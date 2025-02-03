import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../domain/model/dish.model";
import { State } from "../domain/state";
import { GetByIdDishService } from "../infrastructure/services/get-by-id-dish.service";

@Injectable({
    providedIn: 'root'
})

export class GetByIdDishUseCase {
    private readonly _service = inject(GetByIdDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;


    dish$(): Observable<IDish> {
        return this._state.dishes.OneDish$.$();
    }


    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }


    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }


    execute(id: number): void {
        this.subscriptions.add(
            this._service.getById(id)
                .pipe(
                    tap(dish => {
                        console.log(dish);
                        this._state.dishes.OneDish$.set(dish);
                    })
                )
                .subscribe()
        );
    }
}
