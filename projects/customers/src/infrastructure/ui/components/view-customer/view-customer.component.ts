import { Component, input, Input, InputSignal } from '@angular/core';
import { ICustomer } from '../../../../domain/model/customer.model';
import { BoxComponent } from "shared";

@Component({
  selector: 'lib-view-customer',
  imports: [BoxComponent],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss'
})
export class ViewCustomerComponent {

  @Input() customers: ICustomer[] = [];
  public headers: InputSignal<string[]> = input.required<string[]>();

  createCustomer(){

  }

}
