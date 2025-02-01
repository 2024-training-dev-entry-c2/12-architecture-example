import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsComponent } from './view-details.component';

describe('ViewDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the details', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.details')).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')).toBeTruthy();
    expect(compiled.querySelector('h1').textContent).toBe('Detalles del pedido');
  });

  it('should render the details content', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.details__content')).toBeTruthy();
  });

  it('should render the details list', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.details__list')).toBeTruthy();
  });

  it('should render the order', () => {
    const fixture = TestBed.createComponent(ViewDetailsComponent);
    fixture.componentRef.setInput('order', {
      id: 1,
      date: '2022-01-01',
      totalPrice: 100,
      dishesQuantity: 1,
      orderDetails: [
        {
          dish: {
            id: 1,
            name: 'Dish 1',
            description: 'Description 1',
            price: 100,
          },
          quantity: 1,
          unitPrice: 100,
          subTotal: 100,
        }
      ],
      clientName: 'Client 1',
      clientId: 1,
    });

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.order()).toBeTruthy();
    expect(compiled.querySelector('p:nth-child(1)').textContent).toBe('Fecha:2022-01-01');
    expect(compiled.querySelector('p:nth-child(2)').textContent).toBe('Cliente:Client 1');
    expect(compiled.querySelector('p:nth-child(3)').textContent).toBe('Total:100');
    expect(compiled.querySelector('p:nth-child(4)').textContent).toBe('Cantidad de platos:1');
  });

});
