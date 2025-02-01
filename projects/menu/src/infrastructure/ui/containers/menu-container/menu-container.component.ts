import { Component, inject, OnInit } from '@angular/core';
import { PanelMenuComponent } from '../../components/panel-menu/panel-menu.component';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';
import { GetMenuUseCase } from '../../../../application/get-menu.usecase';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';
import { Observable } from 'rxjs';
import { Imenu } from '../../../../domain/model/menu.model';
import { AsyncPipe } from '@angular/common';
import { GetDishesUseCase, Idish } from 'dish';

@Component({
  selector: 'lib-menu-container',
  imports: [AsyncPipe, PanelMenuComponent],
  templateUrl: './menu-container.component.html',
  styleUrl: './menu-container.component.scss',
})
export class MenuContainerComponent implements OnInit {
  public allMenus$: Observable<Imenu[]>;
  public currentMenu$: Observable<Imenu>;
  public platos$: Observable<Idish[]>;
  private readonly _getMenuCase = inject(GetMenuUseCase);
  private readonly _createMenuCase = inject(CreateMenuUseCase);
  private readonly _updateMenuCase = inject(UpdateMenuUseCase);
  private readonly _deleteMenuCase = inject(DeleteMenuUseCase);
  private readonly _getDishCase = inject(GetDishesUseCase);

  ngOnInit(): void {
    this._getMenuCase.initSubscriptions();
    this._createMenuCase.initSubscriptions();
    this._updateMenuCase.initSubscriptions();
    this._deleteMenuCase.initSubscriptions();
    this._getMenuCase.execute();
    this.allMenus$ = this._getMenuCase.menus$();
    this.currentMenu$ = this._updateMenuCase.currentMenu$();
    this.platos$ = this._getDishCase.dishes$();
  }

  ngOnDestroy(): void {
    this._getMenuCase.destroySubscriptions();
  }

  handlePatchMenu(menu: Imenu) {
    const usecase = menu.id ? this._updateMenuCase : this._createMenuCase;
    usecase.execute(menu);
  }

  handleSelectMenu(id: number) {
    this._updateMenuCase.selectMenu(id);
  }

  handleDeleteMenu(id: number) {
    this._deleteMenuCase.execute(id);
  }

  handleCreateMenu(menu: Imenu) {
    this._createMenuCase.execute(menu);
  }
}
