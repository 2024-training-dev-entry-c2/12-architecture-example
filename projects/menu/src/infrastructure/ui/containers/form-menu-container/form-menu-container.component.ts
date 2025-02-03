import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AddMenuUsecase } from '../../../../application/add-menu.usecase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { GetAllMenusUsecase } from '../../../../application/get-all-menu.usecase';
import { DeleteMenuUsecase } from '../../../../application/delete-menu.usecase';
import { ModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';
import { MenuPageComponent } from "../../components/menu-page/menu-page.component";

@Component({
  selector: 'lib-form-menu-container',
  imports: [AsyncPipe, MenuPageComponent],
  templateUrl: './form-menu-container.component.html',
})
export class FormMenuContainerComponent implements OnInit, OnDestroy {
  private readonly _createUseCase = inject(AddMenuUsecase);
  private readonly _updateUseCase = inject(UpdateMenuUseCase);
  private readonly _getMenuUseCase = inject(GetAllMenusUsecase);
  private readonly _deleteUseCase = inject(DeleteMenuUsecase);
  public menus$: Observable<IMenu[]>;
  public currentMenu$: Observable<IMenu>;


  ngOnInit(): void {
    this._getMenuUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._getMenuUseCase.execute();
    this.menus$ = this._getMenuUseCase.menus$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
  }

  ngOnDestroy(): void {
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._getMenuUseCase.destroySubscriptions();
  }

  handleMenu({menu, modal}: {menu: IMenu; modal: ModalComponent}){
    const usecase = menu.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(menu, modal);
    modal.toggle();
  }

  handleDelete(id: number) {
    this._deleteUseCase.execute(id);
  }


  handleSelectMenu(id: number) {
    this._updateUseCase.selectMenu(id);
  }

}
