import { inject, Injectable } from '@angular/core';
import { GetMenuService } from '../infrastructure/services/get-menus.service';
import { StateIndexMenu } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { Imenu } from '../domain/model/menu.model';

@Injectable({ providedIn: 'root' })
export class GetMenuUseCase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(StateIndexMenu);
  private subscription: Subscription;

  menus$(): Observable<Imenu[]> {
    return this._state.stateMenu.menus.$();
  }

  initSubscriptions(): void {
    this.subscription = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscription.unsubscribe();
  }

  execute(): void {
    this.subscription.add(
      this._service
        .execute()
        .pipe(tap(this._state.stateMenu.menus.changeState))
        .subscribe()
    );
  }
}
