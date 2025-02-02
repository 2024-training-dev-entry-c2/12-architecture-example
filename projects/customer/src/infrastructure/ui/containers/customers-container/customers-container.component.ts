import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent } from 'shared';
import { CreateCustomerUseCase } from '../../../../application/create-customer.usecase';
import { GetCustomersUseCase } from '../../../../application/get-customers.usecase';
import { UpdateCustomerUseCase } from '../../../../application/update-customer.usecase';
import { ICustomer } from '../../../../domain/models/customer.model';
import { ListCustomersComponent } from "../../components/list-customers/list-customers.component";

@Component({
  selector: 'lib-customers-container',
  imports: [AsyncPipe, ListCustomersComponent],
  templateUrl: './customers-container.component.html',
})
export class CustomersContainerComponent {
customers(): ICustomer[] {
throw new Error('Method not implemented.');
}
selectCustomer($event: Event) {
throw new Error('Method not implemented.');
}
  private readonly _getUseCase = inject(GetCustomersUseCase);
  private readonly _createUseCase = inject(CreateCustomerUseCase);
  private readonly _updateUseCase = inject(UpdateCustomerUseCase);

  public customers$: Observable<ICustomer[]>;
  public currentCustomer$: Observable<ICustomer>;

  //#region lifeCycle methods
  ngOnInit() {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();

    this.customers$ = this._getUseCase.customers$();
    this.currentCustomer$ = this._updateUseCase.currentCustomer$();
  }

  ngOnDestroy() {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }
  //#endregion

  // #region public methods
  handlePatchCustomer({
    customer,
    modal,
  }: {
    customer: ICustomer;
    modal: ModalComponent;
  }) {
    const usecase = customer.customerId
      ? this._updateUseCase
      : this._createUseCase;
    usecase.execute(customer, modal);
  }

  handleSelectCustomer(customerId: number) {
    this._updateUseCase.selectCustomer(customerId);
  }
  // #endregion
}
