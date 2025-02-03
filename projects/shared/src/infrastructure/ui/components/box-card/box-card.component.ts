import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'customers';
import { CommonModule } from '@angular/common';
import { IDish } from 'dishes';

@Component({
  selector: 'lib-box-card',
  imports: [CommonModule],
  templateUrl: './box-card.component.html',
  styleUrl: './box-card.component.scss'
})
export class BoxCardComponent {

  router = inject(Router);

  @Input() customer: ICustomer = {} as ICustomer;
  @Input() dish: IDish = {} as IDish;

  @Input({transform: booleanAttribute}) isCustomer: boolean = false;
  @Input({transform: booleanAttribute}) isDishes: boolean = false;
  @Output() onDeleteCustomer : EventEmitter<ICustomer> = new EventEmitter<ICustomer>();
  @Output() onDeleteDishes : EventEmitter<IDish> = new EventEmitter<IDish>();

  updateCustomer(){
    this.router.navigate([`/dashboard/customer/update/${this.customer.id}`]);
  }

  removeCustomer(){
    this.onDeleteCustomer.emit(this.customer);
  }

  updateDish(){
    this.router.navigate([`/dashboard/dishes/update/${this.dish.id}`]);
  }

  removeDish(){
    this.onDeleteDishes.emit(this.dish);
  }

}
