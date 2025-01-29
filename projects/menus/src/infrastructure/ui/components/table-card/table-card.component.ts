import { Component, Input } from '@angular/core';
import { IDishResponse } from 'dishes';
import { IMenu } from '../../../../domain/model/menu.model';
import { ButtonsComponent, TableComponent } from 'shared';

@Component({
  selector: 'lib-table-card',
  imports: [ButtonsComponent,TableComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.scss'
})
export class TableCardComponent {

  @Input()getTabs: { id: number; name: string }[] = [];
  @Input()dishfoods: any[] = [];
  activeTab = 0;

  ngOnInit(): void {
    
  }
  images = [
    'assets/icons/form-svgrepo-com.svg#icon-delete',
    'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  selectTab(index: number): void {
    this.activeTab = index;
  }
 

  getMenuDishes(menu: string): any[] {
    return this.dishfoods.filter((dish) => dish.menu === menu);
  }

  deleteMenu(id: number) {

  }
  getMenu(id: number) {

  }

  deleteDish(id: number) {

  }
  
  //update Menu
  dataMenu: IMenu | any;
  MenuId: number = 0;
  DishId: number = 0;
  DishData: IDishResponse | any;



}
