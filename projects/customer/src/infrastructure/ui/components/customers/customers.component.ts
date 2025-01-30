import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ICustomerResponse } from '../../../../domain/model/customer.model';

@Component({
  selector: 'lib-customers',
  imports: [FontAwesomeModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  @Input() public customers: ICustomerResponse[];
}
