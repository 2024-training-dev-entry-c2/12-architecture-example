import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { UpdatePlatoService } from '../infrastructure/services/update-plato.service';
import { IPlato } from '../domain/model/platos.model';

@Injectable({
  providedIn: 'root',
})
export class UpdatePlatoUseCase {
  private readonly _service = inject(UpdatePlatoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentMenu$(): Observable<IPlato> {
    return this._state.platoState.currentPlato.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(menu: IPlato): void {
    this.subscriptions.add(
      this._service
        .execute(menu)
        .pipe(
          tap(() => {
            const platos = this._state.platoState.plato.snapshot();
            const newPlatos = platos.map((m) => (m.id === menu.id ? menu : m));
            this._state.platoState.plato.set(newPlatos);
            this._state.platoState.currentPlato.set(null);
          })
        )
        .subscribe()
    );
  }

  selectMenu(id: number): void {
    const currentPlato = this._state.platoState.plato
      .snapshot()
      .find((menu) => menu.id === id);
    this._state.platoState.currentPlato.set(currentPlato);
  }
  //#endregion
}
