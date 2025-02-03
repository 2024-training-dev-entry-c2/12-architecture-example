import { Component, EventEmitter, inject, input, Input, InputSignal, Output } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer.model';
import { BoxComponent } from "shared";
import { Router } from '@angular/router';


@Component({
  selector: 'lib-view-customer',
  imports: [BoxComponent],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})
export class ViewCustomerComponent {

  @Input() customers: ICustomer[] = [];
  public headers: InputSignal<string[]> = input.required<string[]>();
  router = inject(Router);
  @Output() onDeleteCustomer : EventEmitter<ICustomer> = new EventEmitter<ICustomer>();

  createCustomer(){
    this.router.navigate([`/dashboard/customer/create`]);
  }

  handleDelete(customer: ICustomer){
    this.onDeleteCustomer.emit(customer);
  }


}
