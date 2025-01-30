import { inject, Injectable } from '@angular/core';
import { GetMenuService } from '../../infrastructure/services/get/get-menu.service';
import { State } from '../../domain/state';
import { IMenu } from '../../domain/model/menu.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetMenuUsecase {
  private readonly _service = inject(GetMenuService);
  private readonly _state = inject(State);

  execute(id: number): Observable<IMenu> {
    return this._service.getMenuId(id).pipe(
      tap((menu) => {
        this._state.menus.menu.set(menu);
      })
    );
  }
}
