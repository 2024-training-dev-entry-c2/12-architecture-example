import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent, SelectOption } from 'shared';
import { IOrder, IOrderForm } from '../../../../domain/models/order.model';
import { ListOrdersComponent } from './list-orders.component';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';

describe('ListOrdersComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  const mockOrders: IOrder[] = [
    {
      orderId: 2,
      totalOrderPrice: 7300.0,
      date: new Date().toISOString(),
      customer: {
        customerId: 1,
        name: 'Johan',
        lastName: 'Osorio',
        email: 'JohanO123@gmail.com',
        phone: '+57 1234',
        orderIds: [1, 2],
      },
      dishes: [
        {
          id: 1,
          name: 'Gelatina de mango',
          price: 7300.0,
          menuId: 1,
        },
      ],
    },
  ];

  const mockCustomerOptions: SelectOption<number>[] = [
    { value: 1, label: 'John Doe' },
  ];

  const mockDishOptions: SelectOption<number>[] = [
    { value: 1, label: 'Pizza' },
    { value: 2, label: 'Burger' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListOrdersComponent,
        ModalComponent,
        OrderFormComponent,
        DatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.orders as any).set(mockOrders);
      (component.customerOptions as any).set(mockCustomerOptions);
      (component.dishOptions as any).set(mockDishOptions);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with orders list', () => {
      expect(component.orders()).toEqual(mockOrders);
    });

    it('should have customer options', () => {
      expect(component.customerOptions()).toEqual(mockCustomerOptions);
    });

    it('should have dish options', () => {
      expect(component.dishOptions()).toEqual(mockDishOptions);
    });

    it('should have modal reference', () => {
      expect(component.modal()).toBeTruthy();
    });
  });

  describe('Order List Display', () => {
    it('should display orders in table', () => {
      const rows = fixture.nativeElement.querySelectorAll(
        '.orders-table__body .orders-table__row'
      );
      expect(rows.length).toBe(mockOrders.length);
    });

    it('should display order details correctly', () => {
      const cells = fixture.nativeElement.querySelectorAll(
        '.orders-table__cell'
      );
      const order = mockOrders[0];

      expect(cells[0].textContent).toContain(order.orderId);
      expect(cells[1].textContent).toContain(order.customer.customerId);
      expect(cells[2].textContent).toContain(
        `${order.customer.name} ${order.customer.lastName}`
      );
      expect(cells[4].textContent).toContain(order.totalOrderPrice);
    });

    it('should format date correctly', () => {
      const dateCell = fixture.nativeElement.querySelector(
        '.orders-table__cell:nth-child(4)'
      );
      const date = new Date(mockOrders[0].date);
      const formattedDate = date.toLocaleDateString();

      expect(dateCell.textContent).toContain(formattedDate);
    });
  });

  describe('Order Creation', () => {
    it('should handle new order submission', () => {
      const newOrder: IOrderForm = {
        date: new Date().toISOString(),
        customerId: 1,
        dishIds: [1, 2],
      };

      const createSpy = spyOn(component.onCreateOrder, 'emit');
      component.handleSubmit(newOrder);

      expect(createSpy).toHaveBeenCalledWith({
        order: newOrder,
        modal: component.modal(),
      });
    });

    it('should not emit if order form is invalid', () => {
      const createSpy = spyOn(component.onCreateOrder, 'emit');
      component.handleSubmit(null as any);

      expect(createSpy).not.toHaveBeenCalled();
    });
  });

  describe('Modal Integration', () => {
    it('should render create order modal', () => {
      const modal = fixture.nativeElement.querySelector(
        'lib-modal[action="Crear Orden"]'
      );
      expect(modal).toBeTruthy();
    });

    // it('should pass options to order form', () => {
    //   const orderForm = fixture.debugElement.query(By.directive(MockOrderFormComponent));

    //   expect(orderForm.componentInstance.customerOptions).toEqual(mockCustomerOptions);
    //   expect(orderForm.componentInstance.dishOptions).toEqual(mockDishOptions);
    // });
  });

  describe('Accessibility', () => {
    it('should have proper table ARIA attributes', () => {
      const table = fixture.nativeElement.querySelector('.orders-table');

      expect(table.getAttribute('role')).toBe('table');
      expect(table.getAttribute('aria-label')).toBe('Lista de órdenes');
    });

    it('should have proper scope for table headers', () => {
      const headers = fixture.nativeElement.querySelectorAll('th');
      headers.forEach((header) => {
        expect(header.getAttribute('scope')).toBe('col');
      });
    });
  });
});
