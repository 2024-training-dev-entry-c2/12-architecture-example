import { inject, Injectable } from "@angular/core";
import { CreateDishService } from "../../infrastructure/services/create-dish.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IDishes } from "../../public-api";


@Injectable({
    providedIn: 'root'
})

export class CreateDishUseCase{

    private readonly _service = inject(CreateDishService);
    private readonly _state = inject(State);
    private subscriptions = new Subscription();

    dish$(): Observable<IDishes[]> {
      return this._state.dishes.dish.$();
    }
  

    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }
  
    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }
  
    execute(dish: IDishes): void {
      this.subscriptions.add(
        this._service.createDish(dish)
          .pipe(
            tap(result => {
              const currentDishes = this._state.dishes.dish.snapshot();
              this._state.dishes.dish.set([...currentDishes, result]);
              const currentMenus = this._state.menus.menu.snapshot();
              const updatedMenus = currentMenus.map(menu => 
                menu.id === result.menuId 
                  ? {...menu, dishes: [...(menu.dishes || []), result]} 
                  : menu
              );
    
              this._state.menus.menu.set(updatedMenus);
            })
          )
          .subscribe({
            error: (error) => console.error('Error creating dish:', error)
          })
      );
    }


}