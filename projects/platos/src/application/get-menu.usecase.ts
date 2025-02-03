import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { GetPlatosService } from '../infrastructure/services/get-platos.service';
import { IPlato } from '../domain/model/platos.model';

@Injectable({
  providedIn: 'root',
})
export class GetPlatoUseCase {
  private readonly _service = inject(GetPlatosService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  menus$(): Observable<IPlato[]> {
    return this._state.platoState.plato.$();
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
      this._service
        .execute()
        .pipe(tap(this._state.platoState.plato.set))
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
