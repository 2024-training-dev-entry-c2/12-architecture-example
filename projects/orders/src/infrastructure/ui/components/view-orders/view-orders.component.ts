import { Component, Input } from '@angular/core';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-view-orders',
  imports: [CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent {

  @Input() orders: Observable<IOrders[]>;

}
