import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeletePlatoService } from '../infrastructure/services/delete-plato.service';

@Injectable({
  providedIn: 'root',
})
export class DeletePlatoUseCase {
  private readonly _service = inject(DeletePlatoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap(() => {
            const platos = this._state.platoState.plato.snapshot();
            this._state.platoState.plato.set(
              platos.filter((unPlato) => unPlato.id != id)
            );
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
