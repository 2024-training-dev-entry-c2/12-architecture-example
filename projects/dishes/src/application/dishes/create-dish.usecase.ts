import { inject, Injectable } from "@angular/core";
import { CreateDishService } from "../../infrastructure/services/create-dish.service";
import { State } from "../../domain/state";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { IDish } from "../../domain/model/dish.model";
import { ModalComponent } from "shared";

@Injectable({
    providedIn: 'root'
})
export class CreateDishUsercase {
    private readonly _service = inject(CreateDishService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

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

    execute(dish: IDish, modal: ModalComponent): void{
        this.subscriptions.add(
            this._service.execute(dish).pipe(
                tap(result =>{
                    const dishes = this._state.dishes.dishes.snapshot();
                    this._state.dishes.dishes.set([...dishes, result]);
                }),
                finalize(()=> modal.toggle())      
            ).subscribe()
        );
    }
    //#endregion
}