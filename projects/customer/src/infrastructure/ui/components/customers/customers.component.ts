import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  ICustomerResponse,
  ICustomer,
} from '../../../../domain/model/customer.model';
import { Observable } from 'rxjs';
import { DeleteCardComponent } from 'shared';
import { Router } from '@angular/router';
import { FormCustomerComponent } from '../../forms/form-customer/form-customer.component';

@Component({
  selector: 'lib-customers',
  imports: [FontAwesomeModule, DeleteCardComponent, FormCustomerComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  private readonly router = inject(Router);

  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;

  customers: ICustomerResponse[] = [];

  @Input() public customers$: Observable<ICustomerResponse[]>;

  @Output() public onDelete = new EventEmitter<number>();
  @Output() public onSaveCustomer = new EventEmitter<ICustomer>();

  ngOnInit(): void {
    this.customers$.subscribe((customers) => (this.customers = customers));
  }

  showCreateCustomer(): void {
    this.router.navigate(['/customers/create']);
  }

  showUpdateCustomer(idCustomer: number): void {
    this.router.navigate(['/customers/update', idCustomer]);
  }

  handleSubmit(customer: ICustomer): void {
    this.onSaveCustomer.emit(customer);
  }

  deleteCustomer(idCustomer: number): void {
    this.onDelete.emit(idCustomer);
  }
}
