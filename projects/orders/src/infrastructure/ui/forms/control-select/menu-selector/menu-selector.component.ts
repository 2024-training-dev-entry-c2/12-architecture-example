import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDish } from 'dishes';
import { IMenu } from 'menus';

@Component({
  selector: 'lib-menu-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './menu-selector.component.html',
  styleUrl: './menu-selector.component.scss',
})
export class MenuSelectorComponent {
  @Input() formGroup!: FormGroup;
  @Input() menusList: IMenu[] = [];
  public dishList: IDish[] = [];
  public dishfoodsFiltered: any[] = [];
  @Output() menuSelected = new EventEmitter<number>();
  @Output() dishfoodsSelected = new EventEmitter<IDish>();
  filteredMenu: IMenu[] = [];
  filteredDishes: IDish[] = [];



  onMenuChange(event: Event) {
    this.dishList.splice(0, this.dishList.length);
    const menu = event.target as HTMLSelectElement;
    const menuId = menu.value;
    this.getDish();
    if (menuId) {
      console.log(menuId);

      this.filteredMenu = this.menusList.filter(
        (menu) => menu.id === parseFloat(menuId)
      ) as IMenu[];
      console.log(this.dishList);

      this.filteredDishes = this.dishList.filter(
        (dish) => dish.menu === this.filteredMenu[0].name
      );
      console.log(this.filteredMenu);
      console.log(this.filteredDishes);

      const dishfoodSelect = document.getElementById(
        'dishfoodIds'
      ) as HTMLSelectElement;
      if (dishfoodSelect) {
        dishfoodSelect.value = '';
      }
    } else {
      console.error('menuId is null or undefined');
    }
  }
  getDish(): void {
    this.menusList.forEach((menu) => {
      menu.dishfoods.forEach((dish) => {
        this.dishList.push(dish);
      });
    });
  }

  addDish(event: Event): void {
    console.log(event);
    const selectElement = event.target as HTMLSelectElement;
    const selectedDishId = selectElement.value;
    const parsedId = parseInt(selectedDishId, 10);
    this.dishfoodsSelected.emit(
      this.dishList.find((dish) => dish.id === parsedId)
    );
  }
}
