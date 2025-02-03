import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent, TableComponent } from 'shared';
import { CreateMenuUsecase } from '../../../../application/menu/create-menu.usecase';
import { DeleteMenuUsecase } from '../../../../application/menu/delete-menu.usecase';
import { GetMenusUsecase } from '../../../../application/menu/get-menus.usecase';
import { UpdateMenuUsecase } from '../../../../application/menu/update-menu.usecase';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { IMenu } from '../../../../domain/model/menu.model';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';

@Component({
  selector: 'lib-menu',
  imports: [TableComponent, ModalComponent, MenuFormComponent, AsyncPipe],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly _createUseCase = inject(CreateMenuUsecase);
  private readonly _getUseCase = inject(GetMenusUsecase);
  private readonly _deleteUseCase = inject(DeleteMenuUsecase);
  private readonly _updateUseCase = inject(UpdateMenuUsecase);
  private readonly _modalUseCase = inject(ModalUsecase);

  public menus$: Observable<IMenu[]>;
  public message$: Observable<string>;
  public isOpen$: Observable<boolean>;
  public currentMenu$: Observable<IMenu>;

  public columns = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripcion' },
  ];

  ngOnInit(): void {
    this.init();
    this._getUseCase.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public deleteMenu(menuId: number): void {
    this._deleteUseCase.execute(menuId);
  }

  public updateById(menuId: number): void {
    this._updateUseCase.selectMenu(menuId);
  }

  public submit(menu: IMenu): void {
    const usecase = menu.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(menu);
  }

  public openModal(event: boolean): void {
    this._modalUseCase.execute(event);
  }

  private init(): void {
    this._createUseCase.initSubscriptions();
    this._getUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._modalUseCase.initSubscriptions();
  }

  private destroy(): void {
    this._createUseCase.destroySubscriptions();
    this._getUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._modalUseCase.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.menus$ = this._getUseCase.menus$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
    this.message$ = this._createUseCase.message$();
    this.isOpen$ = this._modalUseCase.open$();
  }
}