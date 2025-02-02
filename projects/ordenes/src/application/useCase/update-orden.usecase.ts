import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'shared';
import { UpdateOrdenService } from '../../infrastructure/services/update/update-orden.service';
import { ICreateOrden } from '../../domain/model/create-orden.model';


@Injectable({
  providedIn: 'root',
})
export class UpdateOrdenUseCase {
  private readonly _service = inject(UpdateOrdenService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentOrden$(): Observable<ICreateOrden> {
    return this._state.ordenes.currentOrdenes.$();
  }

  successMessage$(): Observable<string | null> {
    return this._state.ordenes.successMessage.$();
  }
  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  execute(orden: ICreateOrden, modal: ModalComponent): void {
    this.subscriptions.add(
      this._service
        .updateOrden(orden)
        .pipe(
          tap((orden) => {
            const ordenes = this._state.ordenes.ordenes.snapshot();
            const newOrden = ordenes.map((o) =>
              o.id === orden.id ? orden : o
            );
            this._state.ordenes.ordenes.set(newOrden);
            this._state.ordenes.successMessage.set(
              '¡Orden actualizada con éxito!'
            );

            setTimeout(() => {
              modal.toggle();
              this._state.ordenes.currentOrdenes.set(null);
              this._state.ordenes.successMessage.set('');
            }, 1000);
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
