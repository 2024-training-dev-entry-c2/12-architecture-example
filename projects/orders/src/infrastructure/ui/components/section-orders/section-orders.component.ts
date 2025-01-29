import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrders } from '../../../../domain/model/orders.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'lib-section-orders',
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './section-orders.component.html',
  styleUrl: './section-orders.component.scss'
})
export class SectionOrdersComponent {

    @Input() orders$!: Observable<IOrders[]>;
    
  
    openEditModal(order: IOrders): void {
      console.log('Edit client:', order);
   
    }
  
    openAddModal(order: IOrders): void {
      console.log('Edit client:', order);
   
    }
  
  
    openDeleteModal(order: IOrders): void {
      console.log('Delete client:', order);
      
    }
  
    tableContent = () => ['Menu ID', 'Order Time', 'Price', 'Client ID', 'Client Email', 'Dishes','Actions'];

}
