import { inject, Injectable } from "@angular/core";
import { UpdateDishService } from "../../infrastructure/services/update-dish.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dish.model";
import { IDishRequest } from "../../domain/model/dish-request.model";

@Injectable({
    providedIn: 'root'
})
export class UpdateDishUsecase {
    private readonly _service = inject(UpdateDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    
    //#region Observables
    dishes$(): Observable<IDish[]> {
        return this._state.dishes.dishes.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(id:number, dish: IDishRequest): void {
        this.subscriptions.add(
            this._service.execute(id.toString(), dish).pipe(
                tap(result => {
                    const dishes = this._state.dishes.dishes.snapshot()
                    .map(dish => dish.id === result.id ? result : dish);
                    this._state.dishes.dishes.set(dishes);
                })                    
            ).subscribe()
        );
    }
    //#endregion
}