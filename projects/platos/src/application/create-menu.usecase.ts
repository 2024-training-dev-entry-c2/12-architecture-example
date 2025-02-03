import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { CreatePlatoService } from '../infrastructure/services/create-plato.service';
import { IPlato } from '../domain/model/platos.model';

@Injectable({
  providedIn: 'root',
})
export class CreatePlatoUseCase {
  private readonly _service = inject(CreatePlatoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(plato: IPlato): void {
    this.subscriptions.add(
      this._service
        .execute(plato)
        .pipe(
          tap((plato) => {
            const platos = this._state.platoState.plato.snapshot();
            this._state.platoState.plato.set([...platos, plato]);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
