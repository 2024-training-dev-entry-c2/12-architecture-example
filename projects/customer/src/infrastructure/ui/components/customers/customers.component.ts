import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { Observable } from 'rxjs';
import { DeleteCardComponent } from 'shared';

@Component({
  selector: 'lib-customers',
  imports: [FontAwesomeModule, DeleteCardComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  customers: ICustomerResponse[] = [];

  @Input() public customers$: Observable<ICustomerResponse[]>;

  @Output() public onDelete = new EventEmitter<number>();

  ngOnInit(): void {
    this.customers$.subscribe((customers) => (this.customers = customers));
  }

  deleteCustomer(idCustomer: number): void {
    this.onDelete.emit(idCustomer);
  }
}
