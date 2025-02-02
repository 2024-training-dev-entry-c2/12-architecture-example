import { Component, inject } from '@angular/core';
import { MenusComponent } from '../../components/menus/menus.component';
import { AsyncPipe } from '@angular/common';
import { ListMenusUsecase } from '../../../../application/menus/list-menus.usecase';
import { CreateMenuUsecase } from '../../../../application/menus/create-menu.usecase';
import { UpdateMenuUsecase } from '../../../../application/menus/update-menu.usecase';
import { Observable } from 'rxjs';
import { IMenuResponse, IMenu } from '../../../../domain/model/menu.model';
import { DeleteMenuUsecase } from '../../../../application/menus/delete-menu.usecase';

@Component({
  selector: 'lib-menus-container',
  imports: [MenusComponent, AsyncPipe],
  templateUrl: './menus-container.component.html',
})
export class MenusContainerComponent {
  private readonly _listUseCase = inject(ListMenusUsecase);
  private readonly _createUseCase = inject(CreateMenuUsecase);
  private readonly _updateUseCase = inject(UpdateMenuUsecase);
  private readonly _deleteUseCase = inject(DeleteMenuUsecase);

  public menus$: Observable<IMenuResponse[]>;
  public currentMenu$: Observable<IMenuResponse>;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._listUseCase.execute();
    this.menus$ = this._listUseCase.menuResponse$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
  }

  createMenu(menu: IMenu): void {
    const currentMenu = this._updateUseCase.snapshotCurrentMenu();
    if (!currentMenu?.id) {
      this._createUseCase.execute(menu);
    } else {
      this._updateUseCase.execute(currentMenu.id, menu);
    }
  }

  deleteMenu(menuId: number): void {
    const menus = this._listUseCase.snapshotMenuResponse();
    const menu = menus.find((m) => m.id === menuId);
    if (!menu) {
      return;
    }
    const deletedMenu: IMenu = {
      menuName: menu.menuName,
      description: menu.description,
      active: false,
    };
    this._deleteUseCase.execute(menuId, deletedMenu);
  }

  handleSelectMenu(idMenu: number): void {
    this._updateUseCase.selectMenu(idMenu);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }
}
