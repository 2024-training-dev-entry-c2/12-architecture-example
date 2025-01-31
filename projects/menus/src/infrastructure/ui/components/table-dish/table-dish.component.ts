import { Component, computed, input, Input, output } from '@angular/core';
import { TableComponent } from 'shared';
import { IMenu } from '../../../../public-api';

@Component({
  selector: 'lib-table-dish',
  imports: [TableComponent],
  templateUrl: './table-dish.component.html',
  styleUrl: './table-dish.component.scss',
})
export class TableDishComponent {
  public menu = input.required<IMenu[]>();
  public item = input.required<number>();
  public deleteDishfood= output<number>(); 
  public showModal = false;
  public showModalUpdate = false;
  redirectToDish() {
    this.showModal = true;
  }
  redirectToDishUpdate($event: number) {
    this.showModalUpdate = true;
  }
  deleteDish($event: number) {
    console.log($event);
    this.deleteDishfood.emit($event);
  }
  getMenuDishes() {
    console.log(this.menu());
    
    return this.menu().find((menu) => menu.id === this.item())?.dishfoods;
  }
  closeModal() {
    this.showModal = false;
    this.showModalUpdate = false;
  }

}

