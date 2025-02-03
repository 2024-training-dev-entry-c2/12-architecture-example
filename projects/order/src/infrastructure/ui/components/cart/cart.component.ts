import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { IDishResponse } from 'dish';
import { ICustomerResponse } from 'customer';
import {
  IDetail,
  IOrder,
  IOrderRequestDTO,
} from '../../../../domain/model/order.model';

@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  faX = faX;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public newOrder = new EventEmitter<IOrder>();

  public client: ICustomerResponse | null = null;
  public dishes: IDishResponse[] = [];
  public quantities: number[] = [];

  ngOnInit(): void {
    this.client =
      JSON.parse(sessionStorage.getItem('client') as string) || null;
    this.dishes = JSON.parse(sessionStorage.getItem('dishes') as string) || [];
    for (let i = 0; i < this.dishes.length; i++) {
      this.quantities.push(1);
    }
  }

  close() {
    this.closeModal.emit();
  }

  increment(index: number): void {
    this.quantities[index]++;
  }

  decrement(index: number): void {
    if (this.quantities[index] >= 1) {
      this.quantities[index]--;
    }
    if (this.quantities[index] === 0) {
      this.dishes.splice(index, 1);
      sessionStorage.setItem('dishes', JSON.stringify(this.dishes));
    }
  }

  saveOrder(): void {
    const orderRequestDTO: IOrderRequestDTO = {
      clientId: this.client!.id,
      status: 'PROCESSING',
    };
    const orderDetails: IDetail[] = [];
    for (let i = 0; i < this.dishes.length; i++) {
      orderDetails.push({
        quantity: this.quantities[i],
        dishId: this.dishes[i].id,
      });
    }
    const order: IOrder = {
      orderRequestDTO: orderRequestDTO,
      details: orderDetails,
    };

    this.newOrder.emit(order);
    this.client = null;
    this.dishes = [];
    this.quantities = [];
    sessionStorage.setItem('client', JSON.stringify(null));
    sessionStorage.setItem('dishes', JSON.stringify([]));
    this.closeModal.emit();
  }
}
