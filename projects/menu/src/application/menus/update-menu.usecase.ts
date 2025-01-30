import { Injectable, inject } from '@angular/core';
import { UpdateMenuService } from '../../infrastructure/services/update-menu.service';
import { ListMenusUseCase } from './list-menus.usecase';
import { first, map, Observable, switchMap } from 'rxjs';
import { IMenu } from '../../domain/model/menus.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateMenuUseCase {
  private readonly _updateService = inject(UpdateMenuService);
  private readonly _listUsecase = inject(ListMenusUseCase);

updateMenu(menuId: number, menuName: string, menus$: Observable<IMenu[]>): Observable<IMenu> {
    return menus$.pipe(
      first(),
      map(menus => menus.find(menu => menu.idMenu === menuId)), 
      switchMap(menuToUpdate => {
        if (!menuToUpdate) {
          throw new Error('Menu no encontrado');
        }

        const updatedMenu: IMenu = {
          ...menuToUpdate,
          menuName: menuName 
        };

        return this._updateService.updateMenu(menuId, updatedMenu).pipe(
          map(updatedMenu => {
            this._listUsecase.loadMenus(); 
            return updatedMenu;
          })
        );
      })
    );
  }
}
