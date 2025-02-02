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
  private readonly _useCaseCreate = inject(CreateMenuUsecase);
  private readonly _useCaseGet = inject(GetMenusUsecase);
  private readonly _useCaseDelete = inject(DeleteMenuUsecase);
  private readonly _useCaseUpdate = inject(UpdateMenuUsecase);
  private readonly _useCaseModal = inject(ModalUsecase);

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
    this._useCaseGet.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public deleteMenu(menuId: number): void {
    this._useCaseDelete.execute(menuId);
  }

  public updateById(menuId: number): void {
    this._useCaseUpdate.selectMenu(menuId);
  }

  public submit(menu: IMenu): void {
    const usecase = menu.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(menu);
  }

  public openModal(event: boolean): void {
    this._useCaseModal.execute(event);
  }

  private init(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();
  }

  private destroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseGet.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.menus$ = this._useCaseGet.menus$();
    this.currentMenu$ = this._useCaseUpdate.currentMenu$();
    this.message$ = this._useCaseCreate.message$();
    this.isOpen$ = this._useCaseModal.open$();
  }
}