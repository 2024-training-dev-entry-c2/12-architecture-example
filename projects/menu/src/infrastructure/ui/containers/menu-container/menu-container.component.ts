import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe } from '@angular/common';
import { ListMenusUseCase } from '../../../../application/menus/list-menus.usecase';
import { MainComponent } from "../../components/main/main.component";
import { MenuHeaderComponent } from "../../components/menu-header/menu-header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';

@Component({
  selector: 'lib-menu-container',
  imports: [MainComponent, AsyncPipe, MenuHeaderComponent],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _listUsecase = inject(ListMenusUseCase);
  private readonly _createUsecase = inject(CreateMenuUseCase);
  public menu$: Observable<IMenu[]>;

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadMenus();
    this.menu$ = this._listUsecase.menu$();
}

  ngOnDestroy(): void {
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
  }

  loadMenus(): void {
    this._listUsecase.loadMenus();
  }
 
  addMenu(menu: IMenu): void {
    this._createUsecase.addMenu(menu)
  }
}
