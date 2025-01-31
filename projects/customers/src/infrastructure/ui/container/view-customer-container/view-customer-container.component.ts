import { Component } from '@angular/core';
import { ViewCustomerComponent } from "../../components/view-customer/view-customer.component";

@Component({
  selector: 'lib-view-customer-container',
  imports: [ViewCustomerComponent],
  templateUrl: './view-customer-container.component.html',

})
export class ViewCustomerContainerComponent {
  headers: string[] = ['id', 'nombre', 'correo', 'tipo de cliente', 'telefono'];
  
  customers = [
    {
      id: 1,
      name: 'Juan',
      email: 'nuevo cooreo',
      type: 'normal',
      phone: '123456789'
    }
  ];
}
