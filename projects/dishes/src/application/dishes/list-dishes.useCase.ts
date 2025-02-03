import { inject, Injectable } from "@angular/core";
import { ListDishesService } from "../../infrastructure/services/list-dishes.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dishes.model";

@Injectable({
    providedIn: 'root'
})
export class ListsDishesUseCase {
    private readonly _service = inject(ListDishesService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    dish$(): Observable<IDish[]> {
        return this._state.dishes.dish.$();
    }

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(): void {
            this.subscriptions.add(
                this._service.getDishes().pipe(
                    tap(data => this._state.dishes.dish.set(data))
                ).subscribe()
            );
    }
}