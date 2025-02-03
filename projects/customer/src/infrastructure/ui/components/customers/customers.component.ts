import {
  Component,
  EventEmitter,
  inject,
  input,
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
  showCreateModal = false;
  showUpdateModal = false;

  @Input() public customers$: Observable<ICustomerResponse[]>;
  public currentCustomer = input<ICustomerResponse>();

  @Output() public onDelete = new EventEmitter<number>();
  @Output() public onSaveCustomer = new EventEmitter<ICustomer>();
  @Output() public onSelectCustomer = new EventEmitter<number>();

  ngOnInit(): void {
    this.customers$.subscribe((customers) => (this.customers = customers));
  }

  showCreateCustomer(): void {
    this.onSelectCustomer.emit(0);
    this.showCreateModal = true;
  }

  showUpdateCustomer(idCustomer: number): void {
    this.onSelectCustomer.emit(idCustomer);
    this.showUpdateModal = true;
  }

  closeModal(): void {
    this.onSelectCustomer.emit(0);
    this.showCreateModal = false;
    this.showUpdateModal = false;
  }

  handleSubmit(customer: ICustomer): void {
    this.onSaveCustomer.emit(customer);
  }

  deleteCustomer(data: { id: number; index: number }): void {
    this.onDelete.emit(data.id);
  }

  setCustomerCart(customer: ICustomerResponse): void {
    sessionStorage.setItem('client', JSON.stringify(customer));
  }
}
