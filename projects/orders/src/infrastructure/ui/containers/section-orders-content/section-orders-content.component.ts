import { Component, inject } from '@angular/core';
import { SectionOrdersComponent } from '../../components/section-orders/section-orders.component';
import { Observable } from 'rxjs';
import { GetOrdersUseCase } from '../../../../application/orders/get-order.usecase';
import { DeleteOrderUseCase } from '../../../../application/orders/delete-order.usecase';

import { EditOrderUseCase } from '../../../../application/orders/edit-order.usecase';
import { CreateOrderUseCase } from '../../../../application/orders/create-order.usecase';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule } from '@angular/common';
import { GetDishUseCase, IDishes } from 'dishes';

@Component({
  selector: 'lib-section-orders-content',
  imports: [SectionOrdersComponent, CommonModule],
  templateUrl: './section-orders-content.component.html',
})
export class SectionOrdersContentComponent {
   order$: Observable<IOrders[]>;
   dishes$: Observable<IDishes[]>;

   availableDishes: IDishes[] = []; // Lista de platos
  
   isModalOpen = false;
   modalType: 'add' | 'edit' | 'delete' = 'add';
   selectedOrders: IOrders | null = null;
 
   editData: any = null;
 
   constructor(
     private readonly _deleteOrdersUseCase: DeleteOrderUseCase,
     private readonly _createOrdersUseCase: CreateOrderUseCase,
     private readonly _editOrdersUseCase: EditOrderUseCase,
     private readonly _getOrdersUseCase: GetOrdersUseCase,
     private readonly _getDishesUseCase: GetDishUseCase
   ) {}
 
   ngOnInit(): void {
    this._getDishesUseCase.execute();

     this.order$ = this._getOrdersUseCase.order$();

     this.dishes$ = this._getDishesUseCase.dish$();


     this.dishes$.subscribe(dishes => this.availableDishes = dishes);
     
     this._getOrdersUseCase.execute();
     this._getOrdersUseCase.initSubscriptions();
     this._createOrdersUseCase.initSubscriptions();
     this._editOrdersUseCase.initSubscriptions();
     this._deleteOrdersUseCase.initSubscriptions();
   }
 
   openAddModal(): void {
     this.modalType = 'add';
     this.selectedOrders = null;
     this.isModalOpen = true;
   }
 
   openEditModal(menu: IOrders): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedOrders = menu;
    this.editData = menu; // GUARDAR LA VARIABLEEEEEEEEEEEEEEEEEEEEE
   }
 
   openDeleteModal(menu: IOrders): void {
     this.modalType = 'delete';
     this.isModalOpen = true;
     this.selectedOrders = menu;
   }
 
   deleteOrders(): void {
     if (this.selectedOrders) {
       this._deleteOrdersUseCase.execute(this.selectedOrders);
       this.closeModal();
     }
   }
 
   onSave(formValue: any): void {
    if (this.modalType === 'add') {
      this._createOrdersUseCase.execute(formValue);
    } else if (this.modalType === 'edit' && this.selectedOrders) {
      const updatedOrders = { ...this.selectedOrders, ...formValue };
      this._editOrdersUseCase.execute(updatedOrders).subscribe(() => {
        this._getOrdersUseCase.execute();
      });
    }
    this.closeModal();
  }

  
   closeModal(): void {
     this.isModalOpen = false;
     this.selectedOrders = null;
     this.editData = null;
   }
 
   ngOnDestroy(): void {
     this._getOrdersUseCase.destroySubscriptions();
     this._createOrdersUseCase.destroySubscriptions();
     this._editOrdersUseCase.destroySubscriptions();
     this._deleteOrdersUseCase.ngOnDestroy();
   }
}
