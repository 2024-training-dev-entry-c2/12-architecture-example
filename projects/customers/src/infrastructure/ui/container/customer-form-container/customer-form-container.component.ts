import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerFormComponent } from "../../forms/customer-form/customer-form.component";
import { ICreateCustomer } from '../../../../domain/model/create.customer.model';
import { CreateCustomerUseCase } from '../../../../application/create-customer.usercase';

@Component({
  selector: 'lib-customer-form-container',
  imports: [CustomerFormComponent],
  templateUrl: './customer-form-container.component.html'
})
export class CustomerFormContainerComponent implements OnInit, OnDestroy {
  private readonly _createCustomerUseCase = inject(CreateCustomerUseCase);

  ngOnInit(): void {
    this._createCustomerUseCase.initSubscriptions();
  }
  ngOnDestroy(): void {
    this._createCustomerUseCase.destroySubscriptions();
  }
  handleSubmit(customer: ICreateCustomer): void {
    this._createCustomerUseCase.execute(customer);
  }

}
