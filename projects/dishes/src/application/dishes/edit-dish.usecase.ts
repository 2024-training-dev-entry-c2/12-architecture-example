import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { EditDishService } from "../../infrastructure/services/edit-dish.service";
import { IDishes } from "../../public-api";

@Injectable({
    providedIn: 'root'
})

export class EditDishUseCase{
     private readonly _service = inject(EditDishService);
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
             this._service.editDish(dish)
                 .pipe(
                     tap(updatedClient => {
                         const currentClients = this._state.dishes.dish.snapshot();
                         const updatedClients = currentClients.map(c => 
                             c.id === updatedClient.id ? updatedClient : c
                         );
                         this._state.dishes.dish.set(updatedClients);
                     })
                 )
                 .subscribe()
         );
     }
 
     destroySubscriptions(): void {
         this.subscriptions.unsubscribe();
     }

}