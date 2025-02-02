import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent } from 'shared';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { GetMenusUseCase } from '../../../../application/get-menus.usecase';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { IMenu } from '../../../../domain/models/menu.model';
import { ListMenusComponent } from '../../components/list-menus/list-menus.component';

@Component({
  selector: 'lib-menus-container',
  imports: [AsyncPipe, ListMenusComponent],
  templateUrl: './menus-container.component.html',
})
export class MenusContainerComponent {
  private readonly _getUseCase = inject(GetMenusUseCase);
  private readonly _createUseCase = inject(CreateMenuUseCase);
  private readonly _updateUseCase = inject(UpdateMenuUseCase);

  public menus$: Observable<IMenu[]>;
  public currentMenu$: Observable<IMenu>;

  //#region lifeCycle methods
  ngOnInit() {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();

    this.menus$ = this._getUseCase.menus$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
  }

  ngOnDestroy() {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }
  //#endregion

  // #region public methods
  handlePatchMenu({ menu, modal }: { menu: IMenu; modal: ModalComponent }) {
    const usecase = menu.menuId ? this._updateUseCase : this._createUseCase;
    usecase.execute(menu, modal);
  }

  handleSelectMenu(menuId: number) {
    this._updateUseCase.selectMenu(menuId);
  }

  // #endregion
}
