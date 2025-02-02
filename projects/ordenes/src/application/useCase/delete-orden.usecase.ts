import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { DeleteOrdenService } from "../../infrastructure/services/delete/delete-orden.service";
import { ICreateOrden } from "../../domain/model/create-orden.model";


@Injectable({
  providedIn: 'root'
})
export class DeleteOrdenUsecase {
  private readonly _service = inject(DeleteOrdenService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  currentOrden$(): Observable<ICreateOrden> {
    return this._state.ordenes.currentOrdenes.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service.deleteOrderById(id)
        .pipe(
          tap(() => {
            const currentOrden = this._state.ordenes.ordenes.snapshot();
            const updatedOrdenes = currentOrden.filter(orden => orden.id !== id);
            this._state.ordenes.ordenes.set(updatedOrdenes);
          })
        )
        .subscribe()
    );
  }
  selectOrden(id: number): void {
    const currentOrden = this._state.ordenes.ordenes.snapshot().find(ordenes => ordenes.id === id)
    this._state.ordenes.currentOrdenes.set(currentOrden);
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
