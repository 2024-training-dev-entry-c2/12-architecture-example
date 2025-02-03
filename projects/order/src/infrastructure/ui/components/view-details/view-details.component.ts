import { Component, input } from '@angular/core';
import { IOrder } from '../../../../domain/model/order.model';

@Component({
  selector: 'lib-view-details',
  imports: [],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {
  public order = input<IOrder>();
}
