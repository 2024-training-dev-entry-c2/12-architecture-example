import { Component, inject } from '@angular/core';
import { SectionOrdersComponent } from '../../components/section-orders/section-orders.component';
import { Observable } from 'rxjs';
import { GetOrdersUseCase } from '../../../../application/orders/get-order.usecase';
import { DeleteOrderUseCase } from '../../../../application/orders/delete-order.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditOrderUseCase } from '../../../../application/orders/edit-order.usecase';
import { CreateOrderUseCase } from '../../../../application/orders/create-order.usecase';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-section-orders-content',
  imports: [SectionOrdersComponent, CommonModule],
  templateUrl: './section-orders-content.component.html',
})
export class SectionOrdersContentComponent {
   private readonly _deleteOrderUseCase = inject(DeleteOrderUseCase);
   private readonly _createOrderUseCase = inject(CreateOrderUseCase);
   private readonly _editOrderUseCase = inject(EditOrderUseCase);
   private readonly _getOrderUseCase = inject(GetOrdersUseCase);
   private readonly _formBuilder = inject(FormBuilder);
 
   orders$: Observable<IOrders[]>;
   isModalOpen = false;
   modalType: 'add' | 'edit' | 'delete' = 'add';
   selectedOrder: IOrders | null = null;
 
   orderForm: FormGroup = this._formBuilder.group({
    clientName: ['', [Validators.required, Validators.minLength(3)]],
    clientEmail: ['', [Validators.required, Validators.email]],
    dishesText: ['', Validators.required],
   });
 
   formData = [
    { labelName: 'Name', valueLabel: 'clientName' },
    { labelName: 'Email', valueLabel: 'clientEmail' },
    { labelName: 'Dishes', valueLabel: 'dishesText' },
  ];

   get dishesText() {
    return this.orderForm.get('dishesText');
  }
 
   ngOnInit(): void {
     this.orders$ = this._getOrderUseCase.order$();
     this._getOrderUseCase.execute();
     this._getOrderUseCase.initSubscriptions();
     this._createOrderUseCase.initSubscriptions();
     this._editOrderUseCase.initSubscriptions();
     this._deleteOrderUseCase.initSubscriptions();
   }
 
   openAddModal(): void {
     this.modalType = 'add';
     this.isModalOpen = true;
     this.selectedOrder = null;
     this.orderForm.reset();
   }
 
   openEditModal(order: IOrders): void {
     this.modalType = 'edit';
     this.isModalOpen = true;
     this.selectedOrder = order;
     this.orderForm.patchValue(order);
   }
 
   openDeleteModal(order: IOrders): void {
     this.modalType = 'delete';
     this.isModalOpen = true;
     this.selectedOrder = order;
   }
 
   onSave(): void {
  if (this.orderForm.valid) {
    const dishesText = this.dishesText?.value ?? '';
    const dishesArray = dishesText
      .split(',')
      .filter(dish => dish.trim() !== '')
      .map(dish => ({ name: dish.trim() })); 

    const payload = {
      ...this.orderForm.value,
      dishes: dishesArray,
    };

    if (this.modalType === 'add') {
      this._createOrderUseCase.execute(payload);
    } else if (this.modalType === 'edit' && this.selectedOrder) {
      const updatedOrder = { ...this.selectedOrder, ...payload };
      this._editOrderUseCase.execute(updatedOrder)
        .subscribe({
          next: () => {
            this.closeModal();
          },
          error: (error) => {
            console.error('Error updating order:', error);
          }
        });
    }
  }
}
 
   deleteOrder(): void {
    console.log(this.selectedOrder)
     if (this.selectedOrder) {
       this._deleteOrderUseCase.execute(this.selectedOrder);
       this.closeModal();
   }
   }
 
   closeModal(): void {
     this.isModalOpen = false;
     this.selectedOrder = null;
     this.orderForm.reset();
   }
 
   ngOnDestroy(): void {
     this._getOrderUseCase.destroySubscriptions();
     this._createOrderUseCase.destroySubscriptions();
     this._editOrderUseCase.destroySubscriptions();
     this._deleteOrderUseCase.ngOnDestroy();
   }
}
