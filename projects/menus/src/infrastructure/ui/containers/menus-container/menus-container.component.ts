import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListMenusUseCase } from '../../../../application/menus/list-menus-useCase';
import { CreateMenusUseCase } from '../../../../application/menus/create-menus.useCase';
import { UpdateMenusUseCase } from '../../../../application/menus/update-menus.useCase';
import { DeleteMenuUseCase } from '../../../../application/menus/delete-menus.useCase';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { ModalComponent } from 'shared';
import { MenusComponent } from "../../components/menus/menus.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-menus-container',
  imports: [MenusComponent, AsyncPipe],
  templateUrl: './menus-container.component.html',
  styleUrl: './menus-container.component.scss',
})
export class MenusContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(ListMenusUseCase);
  private readonly _createUseCase = inject(CreateMenusUseCase);
  private readonly _updateUseCase = inject(UpdateMenusUseCase);
  private readonly _deleteUseCase = inject(DeleteMenuUseCase);
  public menus$: Observable<IMenu[]>;
  public currentMenu$: Observable<IMenu>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.menus$ = this._getUseCase.menu$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleCreateMenus( {menu, modal} :{menu: IMenu; modal: ModalComponent}) {
    const useCase = menu.id ? this._updateUseCase : this._createUseCase;
    setTimeout(() => {
      useCase.execute(menu, modal);
    }, 500);
  }

  handleSelectMenu(id: string) {
    setTimeout(() => {
      this._updateUseCase.selectMenu(id);
    }, 500);
  }

  handleDeleteMenu(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este menú?')) {
      setTimeout(() => {
        this._deleteUseCase.execute(id);
      }, 500);
    }
  }
}
