import { Component,Input } from '@angular/core';
import { IOrder } from '../../../../domain/model/order.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'lib-get-by-id-order-comp',
  imports: [CurrencyPipe],
  templateUrl: './get-by-id-order-comp.component.html',
  styleUrl: './get-by-id-order-comp.component.scss'
})
export class GetByIdOrderCompComponent {
  @Input() order!: IOrder;
}
