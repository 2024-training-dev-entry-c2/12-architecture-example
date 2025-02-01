import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { GetOrdenesService } from "../../infrastructure/services/get-ordenes.service";
import { IViewOrden } from "../../domain/model/orden.model";


@Injectable({
  providedIn: 'root'
})
export class GetOrdenesUsecase {
  private readonly _service = inject(GetOrdenesService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  ordenes$(): Observable<IViewOrden[]> {
    return this._state.ordenes.ordenes.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          tap(ordenes => {
            this._state.ordenes.ordenes.set(ordenes)
            console.log("caso de uso", ordenes)
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
