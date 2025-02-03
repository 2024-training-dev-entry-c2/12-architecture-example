import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListOrdersUseCase } from "./list-orders.usecase";
import { IOrder } from "../../domain/model/orders.model";

@Injectable({
  providedIn: 'root'
})
export class SearchOrdersUseCase {
  private readonly _state = inject(State);
  private readonly _listOrdersUseCase = inject(ListOrdersUseCase);
  private searchQuery = new BehaviorSubject<string>(''); 

  //#region Observables
  filteredOrders$(): Observable<IOrder[]> {
    return combineLatest([
      this._listOrdersUseCase.order$(),
      this.searchQuery.asObservable()
    ]).pipe(
      map(([orders, query]) =>
        orders.filter(order => 
          order.clientName.toLowerCase().includes(query.toLowerCase())
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
