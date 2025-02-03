import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { IDish } from "../../domain/model/menus.model";
import { CreateDishService } from "../../infrastructure/services/create-dish.service";

@Injectable({
  providedIn: 'root'
})
export class CreateDishUseCase {
  private readonly _service = inject(CreateDishService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

   //#region Observables
   dishes$(): Observable<IDish[]> {
    return this._state.menus.dish.$();  
}
//#endregion

//#region Public Methods
initSubscriptions(): void {
    this.subscriptions = new Subscription();
}

destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
}

addDish(menuId: number, dish: IDish): void {
    console.log('Menu id:', menuId);
    if (!menuId) {
        console.error('El menuId no es válido');
        return;
    }
    this.subscriptions.add(
        this._service.createDish(menuId, dish) 
            .pipe(
                tap(result => {
                    console.log('Response from backend:', result);
                    if (!result) {
                        console.error('Error: Received null or undefined response');
                        return;
                    }
                    const dishes = this._state.menus.dish.snapshot(); 
                    this._state.menus.dish.set([...dishes, result]);  
                })
            ).subscribe()
    );
}
//#endregion

//#region Private Methods
//#endregion
}
