import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListDishesUseCase } from "./list-dishes.usecase";
import { IDish } from "../../domain/model/dishes.model";

@Injectable({
  providedIn: 'root'
})
export class SearchDishesUseCase {
  private readonly _state = inject(State);
  private readonly _listDishesUseCase = inject(ListDishesUseCase);
  private searchQuery = new BehaviorSubject<string>(''); 

  //#region Observables
  filteredDishes$(): Observable<IDish[]> {
      return combineLatest([
        this._listDishesUseCase.dish$(),
        this.searchQuery.asObservable()
      ]).pipe(
        map(([dishes, query]) =>
            dishes.filter(dish => 
                dish.dishName && dish.dishName.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  //#endregion

  //#region Public Methods
  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }
  //#endregion
}
