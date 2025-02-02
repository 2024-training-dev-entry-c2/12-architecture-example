import { inject, Injectable } from "@angular/core";
import { UpdateDishService } from "../../infrastructure/services/update-dish.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dish.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class UpdateDishUsecase {
    private readonly _service = inject(UpdateDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;
    
    //#region Observables
    currentDish$(): Observable<IDish> {
        return this._state.dishes.currentDish.$();
    }
    //#endregion

    //#region Public Methods
    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    selectDish(id:number) : void {
        const currentDish = this._state.dishes.dishes.snapshot().find(dish => dish.id == id);
        this._state.dishes.currentDish.set(currentDish);
    }

    execute(dish: IDish, modal : ModalComponent): void {
        this.subscriptions.add(
            this._service.execute(dish.id.toString(), dish).pipe(
                tap(result => {
                    const dishes = this._state.dishes.dishes.snapshot()
                    .map(dish => dish.id === result.id ? result : dish);
                    this._state.dishes.dishes.set(dishes);
                }),
                finalize(()=> modal.toggle())                    
            ).subscribe()
        );
    }
    //#endregion
}