import { Injectable, inject } from '@angular/core';
import { UpdateMenuService } from '../../infrastructure/services/update-menu.service';
import { ListMenusUseCase } from './list-menus.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../domain/model/menus.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuUseCase {
  private readonly _updateService = inject(UpdateMenuService);
  private readonly _listUsecase = inject(ListMenusUseCase);

  updateMenu(menu: IMenu): Observable<IMenu> {
    return new Observable<IMenu>(observer => {
      this._updateService.updateMenu(menu.idMenu, menu).subscribe({
        next: (updatedMenu) => {
          this._listUsecase.loadMenus(); 
          observer.next(updatedMenu);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
