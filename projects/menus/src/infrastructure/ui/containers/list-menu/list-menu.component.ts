import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetMenusListUseCase } from '../../../../application/menus/list-menus.usecase';
import { IDish, RemoveDishUsecase } from 'dishes';
import { IMenu, IMenuRequest } from '../../../../domain/model/menu.model';
import { TableCardComponent } from '../../components/table-card/table-card.component';
import { RemoveMenuUsecase } from '../../../../application/menus/remove-menus.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UpdateMenuUsecase } from '../../../../application/menus/update-menus.usecase';
import { CreateMenuUsecase } from '../../../../application/menus/create-menus.usecase';
import { ListDishComponent } from '../list-dish/list-dish.component';

@Component({
  selector: 'lib-list-menu',
  imports: [TableCardComponent, AsyncPipe, ListDishComponent],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css',
})
export class ListMenuComponent implements OnInit, OnDestroy {
  private readonly __useCaseMenus = inject(GetMenusListUseCase);
  private readonly __useCaseRemoveMenus = inject(RemoveMenuUsecase);
  private readonly __useCaseRemoveDish = inject(RemoveDishUsecase);
  private readonly __useCasecreate = inject(CreateMenuUsecase);
  private readonly __useCaseUpdate = inject(UpdateMenuUsecase);
  public menus : Observable<IMenu[]>;
  public menuFound$: Observable<IMenu>;
  public currentMenu$: Observable<string>;
  public menuSelect: number=1;

  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.__useCasecreate.initSubscriptions();
    this.__useCaseUpdate.initSubscriptions();
    this.__useCaseMenus.execute();
    this.menus = this.__useCaseMenus.menus$();
    this.menuFound$ = this.__useCaseUpdate.currentMenu$();
  }
  ngOnDestroy(): void {
    this.__useCaseMenus.destroySubscriptions();
    this.__useCasecreate.destroySubscriptions();
    this.__useCaseUpdate.destroySubscriptions();
  }
  handleCreateMenu(menu: IMenuRequest) {
    this.__useCasecreate.execute(menu);
  }
  handleUpdateMenu({menu, id}: { menu: IMenuRequest; id: number }) {
    this.__useCaseUpdate.execute(menu, id);
  }

  removeMenu(id: number) {
    this.__useCaseRemoveMenus.execute(id);
  }
  removeDish(id: number) {
    this.__useCaseRemoveDish.execute(id);
  }
  selectMenu(id: number) {
    this.__useCaseUpdate.selectMenu(id);
  }

  menuSelected(menu: number) {  
    this.menuSelect = menu;
    console.log(menu)
  }

}
