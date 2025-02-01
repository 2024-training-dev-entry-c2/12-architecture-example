import { inject, Injectable } from '@angular/core';
import { GetMenuService } from '../infrastructure/services/get-menus.service';
import { StateIndexMenu } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { DeleteMenuService } from '../infrastructure/services/delete-menu.service';

@Injectable({ providedIn: 'root' })
export class DeleteMenuUseCase {
  private readonly _service = inject(DeleteMenuService);
  private readonly _state = inject(StateIndexMenu);
  private subscription: Subscription;

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(id: number): void {
    this.subscription.add(
      this._service
        .execute(id)
        .pipe(
          tap((item) => {
            const allMenus = this._state.stateMenu.menus.valueState();
            this._state.stateMenu.menus.changeState(
              allMenus.filter((d) => d.id !== id)
            );
          })
        )
        .subscribe()
    );
  }
}
