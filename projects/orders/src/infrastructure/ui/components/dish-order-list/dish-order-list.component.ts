import { Component, input } from '@angular/core';
import { IDishOrder } from '../../../../domain/model/dish-order.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'lib-dish-order-list',
  imports: [TitleCasePipe, CurrencyPipe],
  templateUrl: './dish-order-list.component.html',
  styleUrl: './dish-order-list.component.scss'
})
export class DishOrderListComponent {
  public dishes = input<IDishOrder[]>();
}
