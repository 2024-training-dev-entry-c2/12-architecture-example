import { Component, input, output } from '@angular/core';
import { IOrder } from '../../../../domain/model/order.model';
import { CellOptionsComponent } from 'shared';
import { DishOrderListComponent } from '../dish-order-list/dish-order-list.component';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'lib-order-board',
  imports: [CellOptionsComponent, DishOrderListComponent, TitleCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './order-board.component.html',
  styleUrl: './order-board.component.scss'
})
export class OrderBoardComponent {
  titles = ['fecha', 'cliente', 'platos', 'total']
  orders = input.required<IOrder[]>();
  onSelectOrderToUpdate = output<number>();
  onSelectOrderToDelete = output<number>();

  handleSelectUpdate(id: number){
    this.onSelectOrderToUpdate.emit(id);
  }

  handleSelectDelete(id: number){
    this.onSelectOrderToDelete.emit(id);
  }
}
