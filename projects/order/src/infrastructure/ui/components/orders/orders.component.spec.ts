import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    component.orders$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Pedidos"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1').textContent).toContain('Pedidos');
  });

  it('should have "Nuevo Pedido" button', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(
      By.css('.entity__create-button')
    ).nativeElement;
    expect(buttonElement.textContent).toContain('Nuevo Pedido');
  });
});
