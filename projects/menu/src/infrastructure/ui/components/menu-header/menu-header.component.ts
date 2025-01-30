import { Component, EventEmitter, output, Output } from '@angular/core';
import { HeaderComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menus.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-menu-header',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  // @Output() menuAdded = new EventEmitter<IMenu[]>();
  menuName: string = '';
  dishes: string[] = [];
  onSubmitMenu = output<IMenu>();

  submitMenu(): void {
    if(this.menuName.trim()) {
      const menu: IMenu = {
        idMenu: null, 
        menuName: this.menuName,
        dishes: this.dishes.map(dishName => ({
          idDish: null, 
          dishName: dishName
        }))
      };
      this.onSubmitMenu.emit(menu);
    }
   
  }
}
