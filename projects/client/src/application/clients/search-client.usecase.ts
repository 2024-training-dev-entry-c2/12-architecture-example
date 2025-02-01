import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListClientsUseCase } from "./list-clients.usecase";
import { IClient } from "../../domain/model/clients.model";

@Injectable({
  providedIn: 'root'
})
export class SearchClientsUseCase {
  private readonly _state = inject(State);
  private readonly _listClientsUseCase = inject(ListClientsUseCase);
  private searchQuery = new BehaviorSubject<string>(''); 

  //#region Observables
  filteredClients$(): Observable<IClient[]> {
    return combineLatest([
      this._listClientsUseCase.client$(),
      this.searchQuery.asObservable()
    ]).pipe(
      map(([clients, query]) =>
        clients.filter(client => 
          client.clientName && client.clientName.toLowerCase().includes(query.toLowerCase())
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
