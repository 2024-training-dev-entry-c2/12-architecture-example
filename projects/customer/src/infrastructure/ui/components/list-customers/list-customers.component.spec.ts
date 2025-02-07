import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from 'shared';
import { ICustomer } from '../../../../domain/models/customer.model';
import { CustomerFormComponent } from '../../forms/customer-form/customer-form.component';
import { ListCustomersComponent } from './list-customers.component';

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
    {
      customerId: 2,
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      orderIds: [1, 2],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCustomersComponent, ModalComponent, CustomerFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCustomersComponent);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.customers as any) = signal(mockCustomers);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with customer list', () => {
      expect(component.customers()).toEqual(mockCustomers);
    });

    it('should have modal references', () => {
      expect(component.modal()).toBeTruthy();
      expect(component.deleteModal()).toBeTruthy();
    });

    it('should start without selected customer', () => {
      expect(component.currentCustomer()).toBeUndefined();
      expect(component.customerToDelete).toBeNull();
    });
  });

  describe('Customer Selection', () => {
    it('should emit customer id and toggle modal on selection', () => {
      const selectSpy = spyOn(component.onSelectCustomer, 'emit');
      const modalSpy = spyOn(component.modal(), 'toggle');
      const customerId = mockCustomers[0].customerId;

      component.selectCustomer(customerId);

      expect(selectSpy).toHaveBeenCalledWith(customerId);
      expect(modalSpy).toHaveBeenCalled();
    });
  });

  describe('Customer Creation/Edit', () => {
    it('should handle customer submission', () => {
      const createSpy = spyOn(component.onCreateCustomer, 'emit');
      const newCustomer: ICustomer = {
        customerId: 3,
        name: 'New',
        lastName: 'Customer',
        email: 'new@example.com',
        phone: '1112223333',
        orderIds: [],
      };

      component.handleSubmit(newCustomer);

      expect(createSpy).toHaveBeenCalledWith({
        customer: newCustomer,
        modal: component.modal(),
      });
    });
  });

  describe('Customer Deletion', () => {
    it('should setup delete confirmation', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      const customerToDelete = mockCustomers[0];

      component.handleDeleteClick(customerToDelete);

      expect(component.customerToDelete).toBe(customerToDelete);
      expect(modalSpy).toHaveBeenCalled();
    });

    it('should handle delete confirmation', () => {
      const deleteSpy = spyOn(component.onDeleteCustomer, 'emit');
      const customerToDelete = mockCustomers[0];
      component.customerToDelete = customerToDelete;

      component.handleConfirmDelete();

      expect(deleteSpy).toHaveBeenCalledWith({
        customerId: customerToDelete.customerId,
        modal: component.deleteModal(),
      });
      expect(component.customerToDelete).toBeNull();
    });

    it('should not emit delete if no customer selected', () => {
      const deleteSpy = spyOn(component.onDeleteCustomer, 'emit');
      component.customerToDelete = null;

      component.handleConfirmDelete();

      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should handle delete cancellation', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      component.customerToDelete = mockCustomers[0];

      component.handleCancelDelete();

      expect(modalSpy).toHaveBeenCalled();
      expect(component.customerToDelete).toBeNull();
    });
  });

  describe('Modal Integration', () => {
    it('should toggle create/edit modal with customer selection', () => {
      const modalSpy = spyOn(component.modal(), 'toggle');

      component.selectCustomer(1);

      expect(modalSpy).toHaveBeenCalled();
    });

    it('should toggle delete modal with customer deletion', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');

      component.handleDeleteClick(mockCustomers[0]);

      expect(modalSpy).toHaveBeenCalled();
    });
  });
});
