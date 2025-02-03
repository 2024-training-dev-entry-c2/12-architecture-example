import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IMenu } from '../../domain/model/menus.model';
import { EditMenuService } from '../../infrastructure/services/edit-menu.service';

@Injectable({
  providedIn: 'root',
})
export class EditMenuUseCase {
  private readonly _service = inject(EditMenuService);
  private readonly _state = inject(State);
  private subscriptions = new Subscription();

  menu$(): Observable<IMenu[]> {
    return this._state.menus.menu.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  execute(menu: IMenu): void {
    this.subscriptions.add(
      this._service
        .editMenus(menu)
        .pipe(
          tap((updatedClient) => {
            const currentClients = this._state.menus.menu.snapshot();
            const updatedClients = currentClients.map((c) =>
              c.id === updatedClient.id ? updatedClient : c
            );
            this._state.menus.menu.set(updatedClients);
          })
        )
        .subscribe()
    );
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
}
