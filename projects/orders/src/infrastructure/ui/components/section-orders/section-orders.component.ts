import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { AddModalComponent } from '../../forms/add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';
import { ModalComponent } from 'shared';
import { IDishes } from 'dishes';


@Component({
  selector: 'lib-section-orders',
  imports: [CommonModule, DatePipe, CurrencyPipe, ModalComponent, AddModalComponent, RemoveModalComponent],
  templateUrl: './section-orders.component.html',
  styleUrl: './section-orders.component.scss'
})
export class SectionOrdersComponent {

     @Input() orders: IOrders[] = [];
     @Input() availableDishes: IDishes[] = [];
     @Input() isModalOpen = false;
     @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
     @Input() selectedOrder: IOrders | null = null;
     @Input() orderForm!: FormGroup;
     @Input() formData!: { labelName: string; valueLabel: string }[];
   
     @Output() addOrder= new EventEmitter<void>();
     @Output() editOrder = new EventEmitter<IOrders>();
     @Output() deleteOrder = new EventEmitter<IOrders>();
     @Output() saveOrder = new EventEmitter<void>();
     @Output() confirmDelete = new EventEmitter<void>();
     @Output() closeModal = new EventEmitter<void>();
   
     readonly tableHeaders = [
       'ID Order',
       'Date',
       'Total Price',
       'Client ID',
       'Client Email',
       'Dishes',
       'Actions',
     ];
   
    onOpenAddModal(): void {
        this.addOrder.emit();
      }
    
      onOpenEditModal(order: IOrders): void {
        this.editOrder.emit(order);
      }
    
      onOpenDeleteModal(order: IOrders): void {
        this.deleteOrder.emit(order);
      }
    
      onSave(formValue: any): void {
        this.saveOrder.emit(formValue);
      }
    
      onDelete(): void {
        this.confirmDelete.emit();
      }
    
      onCloseModal(): void {
        this.closeModal.emit();
      }

}
