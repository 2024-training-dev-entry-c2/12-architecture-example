import { booleanAttribute, Component, inject, Input } from '@angular/core';
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

  //customerService = inject(CustomersService);
 // dishesService = inject(DishesService);

  router = inject(Router);

  @Input() customer: ICustomer = {} as ICustomer;
  @Input() dish: IDish = {} as IDish;

  @Input({transform: booleanAttribute}) isCustomer: boolean = false;
  @Input({transform: booleanAttribute}) isDishes: boolean = false;



  updateCustomer(){
    this.router.navigate([`/dashboard/customer/update/${this.customer.id}`]);
  }

  removeCustomer(){
  //  this.customerService.remove(this.customer.id);
  }

  updateDish(){
    this.router.navigate([`/dashboard/dishes/update/${this.dish.id}`]);
  }

  removeDish(){
   // this.dishesService.remove(this.dish.id);
  }

}
