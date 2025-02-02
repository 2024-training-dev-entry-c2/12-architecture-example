import { Component, inject } from '@angular/core';
import { ListMenuComponent } from '../../components/list-menu/list-menu.component';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menu.model';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { GetMenuUseCase } from '../../../../application/get-menu.usecase';
import { AsyncPipe } from '@angular/common';
import { CreateMenuUseCase } from '../../../../application/create-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/delete-menu.usecase';
import { UpdateMenuUseCase } from '../../../../application/update-menu.usecase';

@Component({
  selector: 'lib-menu-container',
  imports: [ListMenuComponent, AsyncPipe],
  templateUrl: './menu-container.component.html',
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetMenuUseCase);
  private readonly _postUseCase = inject(CreateMenuUseCase);
  private readonly _deleteUseCase = inject(DeleteMenuUseCase);
  private readonly _updateUseCase = inject(UpdateMenuUseCase);
  public menus$: Observable<IMenu[]>;
  public currentMenu$: Observable<IMenu>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._postUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();
    this.menus$ = this._getUseCase.menus$();
    this.currentMenu$ = this._updateUseCase.currentMenu$();
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._postUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }

  handleCreateOrUpdate(menu: IMenu) {
    const usecase = menu.id ? this._updateUseCase : this._postUseCase;
    usecase.execute(menu);
  }

  handleSelectMenu(menu: IMenu) {
    this._updateUseCase.selectMenu(menu.id)
  }

  handleDelete(id: number) {
    this._deleteUseCase.execute(id);
  }

}
