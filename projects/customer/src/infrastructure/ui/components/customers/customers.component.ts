import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-customers',
  imports: [FontAwesomeModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  customers: ICustomerResponse[] = [];

  @Input() public customers$: Observable<ICustomerResponse[]>;

  ngOnInit(): void {
    this.customers$.subscribe((customers) => (this.customers = customers));
  }
}
