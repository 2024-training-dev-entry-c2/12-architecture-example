import { Component, computed, input, Input, output } from '@angular/core';
import { TableComponent } from 'shared';
import { IMenu } from '../../../../public-api';
import { CreateDishFormComponent, IDish, IDishRequest, UpdateDishFormComponent } from 'dishes';



@Component({
  selector: 'lib-table-dish',
  imports: [TableComponent, CreateDishFormComponent, UpdateDishFormComponent],
  templateUrl: './table-dish.component.html',
  styleUrl: './table-dish.component.scss',
})
export class TableDishComponent {
  public menu = input.required<IMenu[]>();
  public item = input.required<number>();
  public deleteDishfood = output<number>();
  public currentDish = input<IDish>();
  public createDishData = output<IDishRequest>();
  public onSelectDish = output<number>();
  public updateDish = output<{ dish: IDishRequest; id: number }>();
  public dishId: number = 0;
  public showModal = false;
  public showModalUpdate = false;
  redirectToDish() {
    this.showModal = true;
  }
  redirectToDishUpdate($event: number) {
    this.dishId = $event;
    console.log(this.dishId);
    this.onSelectDish.emit($event)
    console.log(this.currentDish());
    
    this.showModalUpdate = true;
  }
  deleteDish($event: number) {
    console.log($event);
    this.deleteDishfood.emit($event);
  }
  createDish(dish: IDishRequest) {
    dish.menuId = this.item();
    this.createDishData.emit(dish);
  }
  handleUpdateDish(dish: IDishRequest) {
    console.log(dish);
    dish.menuId = this.item();
    this.updateDish.emit({ dish, id: this.dishId});
  }
  getMenuDishes() {
    return this.menu().find((menu) => menu.id === this.item())?.dishfoods;
  }
  closeModal() {
    this.showModal = false;
    this.showModalUpdate = false;
  }
}
