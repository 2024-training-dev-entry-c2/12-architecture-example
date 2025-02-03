import { Injectable, inject } from "@angular/core";
import { Subscription, Observable, tap } from "rxjs";
import { State } from "../../domain/state";
import { ListDishesService } from "../../infrastructure/services/list-dishes.service";
import { IDish } from "../../domain/model/dish.model";

@Injectable({
    providedIn: 'root'
})
export class ListDishesUsecase {
    private readonly _service = inject(ListDishesService);
    private readonly _state = inject(State);
    private subscriptions : Subscription;

    //#region Observables
    dishes$(): Observable<IDish[]>{
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

    execute(): void {
        this.subscriptions.add(
            this._service.execute().pipe(
                tap( this._state.dishes.dishes.set )                    
            ).subscribe()
        );
    }
    //#endregion
}