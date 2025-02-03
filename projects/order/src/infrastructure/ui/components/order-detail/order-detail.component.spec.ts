import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';

describe('CartComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Detalle pedido"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2').textContent).toContain(
      'Detalle pedido'
    );
  });

  it('should receive order details', () => {
    const mockOrderDetails = [
      {
        id: 1,
        quantity: 1,
        dish: {
          id: 1,
          dishName: 'Huevos revueltos',
          description: 'Con pan',
          basePrice: 5000,
          isPopular: true,
          active: true,
        },
        subtotal: 5000,
      },
    ];
    fixture.componentRef.setInput('orderDetails', mockOrderDetails);
    fixture.detectChanges();
    expect(component.orderDetails).toBe(mockOrderDetails);
  });
});
