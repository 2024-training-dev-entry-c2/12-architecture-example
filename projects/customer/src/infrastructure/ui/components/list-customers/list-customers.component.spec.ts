import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCustomersComponent } from './list-customers.component';
import { ModalComponent } from 'shared';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';
import { Component, ViewChild } from '@angular/core';
import { ICustomer } from '../../../../domain/models/customer.model';

@Component({
  selector: 'lib-modal',
  template: '',
})
class MockModalComponent {
  toggle() {}
}

@Component({
  selector: 'lib-customer-form',
  template: '',
})
class MockCustomerFormComponent {}

describe('ListCustomersComponent', () => {
  let component: ListCustomersComponent;
  let fixture: ComponentFixture<ListCustomersComponent>;

  const mockCustomers: ICustomer[] = [
    {
      customerId: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      orderIds: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCustomersComponent],
      declarations: [MockModalComponent, MockCustomerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCustomersComponent);
    component = fixture.componentInstance;

    // Use TestBed.runInInjectionContext to modify input
    TestBed.runInInjectionContext(() => {
      // Access the writeable signal through the component's property
      (component.customers as any).set(mockCustomers);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit event', () => {
    const mockCustomer = mockCustomers[0];
    spyOn(component.onCreateCustomer, 'emit');

    component.handleSubmit(mockCustomer);

    expect(component.onCreateCustomer.emit).toHaveBeenCalledWith({
      customer: mockCustomer,
      modal: component.modal(),
    });
  });

  it('should handle customer selection', () => {
    const customerId = 1;
    spyOn(component.onSelectCustomer, 'emit');
    spyOn(component.modal(), 'toggle');

    component.selectCustomer(customerId);

    expect(component.onSelectCustomer.emit).toHaveBeenCalledWith(customerId);
    expect(component.modal().toggle).toHaveBeenCalled();
  });

  it('should handle delete click', () => {
    const mockCustomer = mockCustomers[0];
    spyOn(component.deleteModal(), 'toggle');

    component.handleDeleteClick(mockCustomer);

    expect(component.customerToDelete).toEqual(mockCustomer);
    expect(component.deleteModal().toggle).toHaveBeenCalled();
  });

  it('should handle confirm delete', () => {
    const mockCustomer = mockCustomers[0];
    component.customerToDelete = mockCustomer;
    spyOn(component.onDeleteCustomer, 'emit');

    component.handleConfirmDelete();

    expect(component.onDeleteCustomer.emit).toHaveBeenCalledWith({
      customerId: mockCustomer.customerId,
      modal: component.deleteModal(),
    });
    expect(component.customerToDelete).toBeNull();
  });

  it('should handle cancel delete', () => {
    const mockCustomer = mockCustomers[0];
    component.customerToDelete = mockCustomer;
    spyOn(component.deleteModal(), 'toggle');

    component.handleCancelDelete();

    expect(component.deleteModal().toggle).toHaveBeenCalled();
    expect(component.customerToDelete).toBeNull();
  });
});
