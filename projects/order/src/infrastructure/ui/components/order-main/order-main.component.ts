import { Component, EventEmitter, input, Output } from '@angular/core';
import { IOrder } from '../../../../domain/model/orders.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'lib-order-main',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './order-main.component.html',
  styleUrl: './order-main.component.scss'
})
export class OrderMainComponent {
  public orders = input<IOrder[]>();
  @Output() deleteOrderEvent = new EventEmitter<number>();
  @Output() editOrderEvent = new EventEmitter<IOrder>();

  actions = [
    { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  getHeaders() {
    return [
      { label: 'Order ID' },
      { label: 'Customer Name' },
      { label: 'Precio total' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return this.actions;
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

   openDeleteModal(idOrder: number): void {
      this.deleteOrderEvent.emit(idOrder);
    }
  
    openEditModal(order: IOrder): void {
      this.editOrderEvent.emit(order);
    }
}
