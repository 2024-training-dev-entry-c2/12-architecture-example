import { inject, Injectable } from "@angular/core";
import { DeleteDishService } from "../../infrastructure/services/delete-dish.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dish.model";

@Injectable({
    providedIn: 'root'
})
export class DeleteDishUsecase {
    private _service = inject(DeleteDishService);
    private _state = inject(State);
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

    execute(id: number): void {
        this.subscriptions.add(
            this._service.execute(id.toString()).pipe(
                tap(() => {
                    const dishes = this._state.dishes.dishes.snapshot()
                    .filter(dish => dish.id != id);
                    this._state.dishes.dishes.set(dishes);
                })                    
            ).subscribe()
        );
    }
    //#endregion

}