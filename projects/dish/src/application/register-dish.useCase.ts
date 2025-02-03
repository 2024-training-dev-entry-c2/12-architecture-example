import { inject, Injectable } from "@angular/core";
import { tap, Subscription, switchMap, map, Observable } from "rxjs";
import { IDish } from "../domain/model/dish.model";
import { State } from "../domain/state";
import { RegisterDishService } from "../infrastructure/services/register-dish.service";
import { GetAllDishService } from "../infrastructure/services/get-all-dish.service";

@Injectable({
    providedIn: 'root'
})
export class RegisterDishUseCase {
    private readonly _createService = inject(RegisterDishService);
    private readonly _getAllService = inject(GetAllDishService);
    private readonly _state = inject(State);

    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(newDish: Partial<IDish>): Observable<void> {
        return this._createService.save(newDish).pipe(
            tap(response => {
                console.log(`Plato creado: ${response}`);
            }),
            switchMap(() => this._getAllService.getAll()),
            tap(updatedDishList => {
                this._state.dishes.dish.set(updatedDishList);
            }),
            map(() => void 0) 
        );
    }
}
