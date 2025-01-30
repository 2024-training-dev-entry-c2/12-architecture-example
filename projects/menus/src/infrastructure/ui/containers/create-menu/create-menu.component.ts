import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateMenuUsecase } from '../../../../application/menus/create-menus.usecase';
import { Observable } from 'rxjs';
import { IMenu, IMenuRequest } from '../../../../domain/model/menu.model';
import { CreateMenuFormComponent } from '../../forms/create-menu-form/create-menu-form.component';
import { ListMenuComponent } from "../list-menu/list-menu.component";

@Component({
  selector: 'lib-create-menu',
  imports: [CreateMenuFormComponent, ListMenuComponent],
  templateUrl: './create-menu.component.html',
  
})
export class CreateMenuComponent implements OnInit, OnDestroy {
  private readonly __useCaseMenus = inject(CreateMenuUsecase);
  public menu$: Observable<IMenu>;
  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.menu$ = this.__useCaseMenus.menus$();
  }
  ngOnDestroy(): void {
    this.__useCaseMenus.destroySubscriptions();
  }

  createMenu(menu: IMenuRequest): void {
    this.__useCaseMenus.execute(menu);
  }
}
