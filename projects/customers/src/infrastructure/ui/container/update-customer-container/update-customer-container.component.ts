import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ICreateCustomer } from '../../../../domain/model/create.customer.model';
import { CustomerFormComponent } from "../../forms/customer-form/customer-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCustomerUseCase } from '../../../../application/update-customer.usecase';
import { Observable } from 'rxjs';
import { ICustomer } from '../../../../domain/model/customer.model';
import { FindAllCustomersCase } from '../../../../application/find-all-customers.usercase';

@Component({
  selector: 'lib-update-customer-container',
  imports: [CustomerFormComponent],
  templateUrl: './update-customer-container.component.html'
})
export class UpdateCustomerContainerComponent implements OnInit,OnDestroy {

  private readonly _updateCustomerUseCase = inject(UpdateCustomerUseCase);
  private readonly _findAllCustomersUseCase = inject(FindAllCustomersCase);
  private activatedRoute = inject(ActivatedRoute);
  private id: number = 0;
  private router = inject(Router);
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this._findAllCustomersUseCase.initSubscriptions();
    this._findAllCustomersUseCase.execute();
    this._updateCustomerUseCase.initSubscriptions();

  }

  ngOnDestroy(): void {
    this._findAllCustomersUseCase.destroySubscriptions();
    this._updateCustomerUseCase.destroySubscriptions();
  }

  handleSubmit(customer: ICreateCustomer):void{
    this._updateCustomerUseCase.execute(this.id, customer);
    this.router.navigate(['/dashboard/customer/view']);
  }
}
