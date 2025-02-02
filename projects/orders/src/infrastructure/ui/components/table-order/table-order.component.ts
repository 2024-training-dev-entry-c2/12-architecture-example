import { Component, input, output, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Iorder } from '../../../../domain/model/orders.model';
import { ModalComponent } from 'shared';
import { Idish } from 'dish';
import { FormOrdersComponent } from '../../forms/form-orders/form-orders.component';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-table-order',
  imports: [MatIconModule, ModalComponent, FormOrdersComponent],
  templateUrl: './table-order.component.html',
  styleUrl: './table-order.component.scss',
})
export class TableOrderComponent {
  public modal = viewChild<ModalComponent>('modal');
  public orders = input<Iorder[]>([]);
  public allDishes = input<Idish[]>([]);
  public currentOrder = input<Iorder>();
  public allClients = input<Iclient[]>([]);
  public onCreateOrder = output<Iorder>();
  public onSelectOrder = output<number>();
  public onDeleteOrder = output<number>();
  public itemsTable: string[] = [
    'ID Orden',
    'Cliente',
    'Platos',
    'Total',
    'Estado',
    'Fecha',
    'Acciones',
  ];

  handleSubmit(order: Iorder) {
    this.onCreateOrder.emit(order);
  }

  selectOrder(id: number) {
    this.onSelectOrder.emit(id);
    console.log('usuario seleccionado', id);
    this.modal().toggle();
  }

  deleteOrder(id: number) {
    this.onDeleteOrder.emit(id);
  }
}
