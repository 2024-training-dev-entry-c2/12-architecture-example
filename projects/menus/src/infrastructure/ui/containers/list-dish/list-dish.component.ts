import { Component, inject, Input, input, Output } from '@angular/core';
import { RemoveDishUsecase } from 'dishes';
import { GetMenusListUseCase, IMenu } from '../../../../public-api';
import { Observable } from 'rxjs';

import { TableDishComponent } from '../../components/table-dish/table-dish.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-list-dish',
  imports: [TableDishComponent, AsyncPipe],
  templateUrl: './list-dish.component.html',
  styleUrl: './list-dish.component.css',
})
export class ListDishComponent {
  private readonly __useCaseMenus = inject(GetMenusListUseCase);
  private readonly __useCaseRemoveDish = inject(RemoveDishUsecase);
  @Input() menuSelected: number
  public menus: Observable<IMenu[]>;

  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.__useCaseMenus.execute();
    this.menus = this.__useCaseMenus.menus$();
  }
  ngOnDestroy(): void {
    this.__useCaseMenus.destroySubscriptions();
  }

  removeDish(id: number) {
    this.__useCaseRemoveDish.execute(id);
  }
}
