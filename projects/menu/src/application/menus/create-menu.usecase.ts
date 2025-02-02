import { inject, Injectable } from '@angular/core';
import { State } from '../../domain/state';
import { Subscription, tap } from 'rxjs';
import { CreateMenuService } from '../../infrastructure/services/create-menu.service';
import { IMenu } from '../../domain/model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class CreateMenuUsecase {
  private readonly _createMenuService = inject(CreateMenuService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(payload: IMenu): void {
    this.subscriptions.add(
      this._createMenuService
        .execute(payload)
        .pipe(
          tap((result) => {
            const menus = this._state.menus.menuResponse.snapshot();
            this._state.menus.menuResponse.set([...menus, result]);
          })
        )
        .subscribe()
    );
  }
}
