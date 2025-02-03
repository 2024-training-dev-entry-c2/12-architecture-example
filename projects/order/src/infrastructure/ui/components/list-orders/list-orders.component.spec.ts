import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOrdersComponent } from './list-orders.component';
import { ModalComponent, SelectOption } from 'shared';
import { IOrder, IOrderForm } from '../../../../domain/models/order.model';

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
      imports: [ListOrdersComponent, ModalComponent],
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

  it('should display orders in table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockOrders.length);
  });

  it('should display order details correctly', () => {
    const cells = fixture.nativeElement.querySelectorAll('td');
    expect(cells[0].textContent).toContain(mockOrders[0].orderId);
    expect(cells[1].textContent).toContain(mockOrders[0].customer.name);
    expect(cells[2].textContent).toContain(
      new Date(mockOrders[0].date).toLocaleDateString()
    );
    expect(cells[3].textContent).toContain(mockOrders[0].totalOrderPrice);
  });

  it('should emit create order event', () => {
    const mockOrderForm: IOrderForm = {
      date: new Date().toISOString(),
      customerId: 1,
      dishIds: [1, 2],
    };

    let emittedOrder: { order: IOrderForm; modal: ModalComponent } | undefined;
    component.onCreateOrder.subscribe((event) => {
      emittedOrder = event;
    });

    component.handleSubmit(mockOrderForm);

    expect(emittedOrder?.order).toEqual(mockOrderForm);
    expect(emittedOrder?.modal).toBeDefined();
  });
});
