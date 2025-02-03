import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  IOrderResponse,
  IOrder,
  IOrderRequestDTO,
} from '../../../../domain/model/order.model';
import { Observable } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { CartComponent } from '../cart/cart.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'lib-orders',
  imports: [
    FontAwesomeModule,
    DecimalPipe,
    DatePipe,
    OrderDetailComponent,
    CartComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  faPlus = faPlus;
  showOrderDetails = false;
  showCart = false;

  orders: IOrderResponse[] = [];
  selectedOrder: IOrderResponse | null = null;

  @Input() public orders$: Observable<IOrderResponse[]>;

  @Output() public onUpdateOrder = new EventEmitter<{
    id: number;
    payload: IOrderRequestDTO;
  }>();
  @Output() public onCreateOrder = new EventEmitter<IOrder>();

  ngOnInit(): void {
    this.orders$.subscribe((orders) => (this.orders = orders));
  }

  showOrderDetailsModal(order: IOrderResponse): void {
    this.selectedOrder = order;
    this.showOrderDetails = true;
  }

  closeOrderDetailsModal(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
  }

  showCartModal(): void {
    this.showCart = true;
  }

  closeCartModal(): void {
    this.showCart = false;
  }

  createOrder(order: IOrder): void {
    this.onCreateOrder.emit(order);
  }

  changeStatus(order: IOrderResponse, status: string): void {
    this.onUpdateOrder.emit({
      id: order.id,
      payload: {
        clientId: order.client.id,
        status: status,
      },
    });
  }
}
