import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { CreateOrdenService } from "../../infrastructure/services/post/create-orden.service";
import { ICreateOrden } from "../../domain/model/create-orden.model";
import { ModalComponent } from "shared";


@Injectable({
  providedIn: 'root'
})
export class CreateOrdenUsecase {
  private readonly _service = inject(CreateOrdenService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
      this._service.addOrden(orden)
      .pipe(
        tap((orden) => {
          const currentOrdenes = this._state.ordenes.ordenes.snapshot();
          this._state.ordenes.ordenes.set([...currentOrdenes, orden]);
          this._state.ordenes.successMessage.set('¡Orden creada con éxito!')

          setTimeout(() => {
            modal.toggle();
            this._state.ordenes.successMessage.set('')
          }, 2000);

        }),
      ).subscribe()
    )
    }

  //#endregion

  //#region Private Methods
  //#endregion
}
