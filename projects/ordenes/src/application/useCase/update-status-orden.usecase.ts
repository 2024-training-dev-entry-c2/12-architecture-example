import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { UpdateOrdenService } from '../../infrastructure/services/update/update-orden.service';
import { ICreateOrden } from '../../domain/model/create-orden.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateStatusOrdenUseCase {
  private readonly _service = inject(UpdateOrdenService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  statusOrden$(): Observable<string> {
    return this._state.ordenes.statusOrden.$();
  }

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(orden: ICreateOrden): void {
    this.subscriptions.add(
      this._service
        .updateStatusOrden(orden.id, orden.statusOrder)
        .pipe(
          tap((updatedOrden) => {
            this._state.ordenes.statusOrden.set(orden.statusOrder);
            this._state.ordenes.currentOrdenes.set(updatedOrden);
            const ordenes = this._state.ordenes.ordenes.snapshot();
            const index = ordenes.findIndex((o) => o.id === updatedOrden.id);
            if (index !== -1) {
              ordenes[index] = updatedOrden;
            }
            this._state.ordenes.ordenes.set(ordenes);
          })
        )
        .subscribe()
    );
  }
  selectOrden(id: number): void {
    const currentOrden = this._state.ordenes.ordenes
      .snapshot()
      .find((orden) => orden.id === id);
    this._state.ordenes.currentOrdenes.set(currentOrden);
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
