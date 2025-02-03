import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IMenu } from "../../domain/model/menus.model";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListMenusUseCase } from "./list-menus.usecase";

@Injectable({
  providedIn: 'root'
})
export class SearchMenusUseCase {
  private readonly _state = inject(State);
  private readonly _listMenusUseCase = inject(ListMenusUseCase);
  private searchQuery = new BehaviorSubject<string>(''); 

  //#region Observables
  filteredMenus$(): Observable<IMenu[]> {
    return combineLatest([
      this._listMenusUseCase.menu$(),
      this.searchQuery.asObservable()
    ]).pipe(
      map(([menus, query]) =>
        menus.filter(menu => 
          menu.menuName.toLowerCase().includes(query.toLowerCase())
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
