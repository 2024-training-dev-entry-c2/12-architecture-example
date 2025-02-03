import { Component, input, output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { CellOptionsComponent } from 'shared';
import { TitleCasePipe } from '@angular/common';
import { DishesListComponent } from '../dishes-list/dishes-list.component';

@Component({
  selector: 'lib-menu-board',
  imports: [DishesListComponent, CellOptionsComponent, TitleCasePipe],
  templateUrl: './menu-board.component.html',
  styleUrl: './menu-board.component.scss'
})
export class MenuBoardComponent {
  titles = ['nombre', 'platos']
  menus = input.required<IMenu[]>();
  onSelectmenuToUpdate = output<number>();
  onSelectmenuToDelete = output<number>();

  handleSelectUpdate(id: number){
    this.onSelectmenuToUpdate.emit(id);
  }

  handleSelectDelete(id: number){
    this.onSelectmenuToDelete.emit(id);
  }
}
