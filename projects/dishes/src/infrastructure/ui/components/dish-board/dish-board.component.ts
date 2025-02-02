import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IMenu } from 'menus';
import { CellOptionsComponent } from 'shared';
import { IDish } from '../../../../domain/model/dish.model';


@Component({
  selector: 'lib-dish-board',
  imports: [CellOptionsComponent, TitleCasePipe, CurrencyPipe],
  templateUrl: './dish-board.component.html',
  styleUrl: './dish-board.component.scss'
})
export class DishBoardComponent {
  titles = ['nombre', 'descripción', 'precio', 'tipo de plato', 'menú']
  dishes = input.required<IDish[]>();
  menus = input.required<IMenu[]>();

  onSelectDishToUpdate = output<number>();
  onSelectDishToDelete = output<number>();

  getNameMenuById(id:number) : string {
    const menu = this.menus().find(menu => menu.id == id);
    return menu? menu.name : 'Sin menú';
  }

  handleSelectUpdate(id: number){
    this.onSelectDishToUpdate.emit(id);
  }

  handleSelectDelete(id: number){
    this.onSelectDishToDelete.emit(id);
  }
}
