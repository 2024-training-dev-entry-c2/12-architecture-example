import { Component, input, output, viewChild } from '@angular/core';
import { DeleteModalComponent, ModalComponent, SearchBarComponent } from 'shared';
import { OrderBoardComponent } from '../order-board/order-board.component';
import { IOrder } from '../../../../domain/model/order.model';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { IClient } from 'clients';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-orders-section',
  imports: [ModalComponent, SearchBarComponent, OrderFormComponent, DeleteModalComponent, OrderBoardComponent],
  templateUrl: './orders-section.component.html',
  styleUrl: './orders-section.component.scss'
})
export class OrdersSectionComponent {
  public modalTitle = 'Crear Pedido';
  public formAction : string = 'Crear';
  public formTheme: 'success' | 'warning' = 'success';
  public isEditing = false;

  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<DeleteModalComponent>('deleteModal');
  public form = viewChild<OrderFormComponent>('orderForm');

  public orders = input.required<IOrder[]>();
  public currentOrder = input.required<IOrder>();
  public clients = input.required<IClient[]>();
  public dishes = input.required<IDish[]>();

  public onSave = output<{order: IOrder, modal: ModalComponent}>();
  public onSelectToUpdate = output<number>();
  public onDelete = output<number>();

  public filteredOrders: IOrder[] = [];  

  handleFilteredData(data: IOrder[]): void {
    this.filteredOrders = data;
  }

  handleSubmit(order : IOrder) {
    this.onSave.emit({order, modal: this.modal()});
  }

  handleCloseModal(){
    this.form().resetForm();
  }

  selectOrderToUpdate(id:number){
    this.isEditing = true;
    this.modalTitle = 'Actualizar pedido';
    this.formAction = 'Actualizar';
    this.formTheme = 'warning';

    this.onSelectToUpdate.emit(id);
    this.modal().toggle();
  }

  selectOrderToDelete(id:number){
    this.deleteModal().openDeleteModal(id);
  }

  handleDelete(id: number){
    this.onDelete.emit(id);
  }

  openCreateModal() {
    this.isEditing = false;
    this.modalTitle = 'Crear Pedido';
    this.formAction = 'Crear';
    this.formTheme = 'success';
    this.form().resetForm();
  }
}
