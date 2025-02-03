import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllOrderCompComponent } from './get-all-order-comp.component';
import { IOrder } from '../../../../domain/model/order.model';

describe('GetAllOrderCompComponent', () => {
  let fixture: ComponentFixture<GetAllOrderCompComponent>;
  let component: GetAllOrderCompComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllOrderCompComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllOrderCompComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('orders', [
      {
        id: 50,
        idCliente: 3,
        detalles: [
          { cantidad: 1, precio: 5000.0, idPlato: 13, nombrePlato: 'Arroz Blanco' },
          { cantidad: 2, precio: 7000.0, idPlato: 14, nombrePlato: 'Arepa de Huevo' }
        ],
        total: 12000.0,
        estado: 'PENDIENTE',
        fechaPedido: [2025, 1, 27, 3, 45, 54, 820364000]
      } as IOrder
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the update button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const updateButtons = compiled.querySelectorAll('.get-all-order__button');

    expect(updateButtons.length).toBeGreaterThan(0);
    expect(updateButtons[0].textContent?.trim()).toBe('Actualizar');
  });


  it('should display the delete button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButtons = compiled.querySelectorAll('.get-all-order__button--secundary');

    expect(deleteButtons.length).toBeGreaterThan(0);
    expect(deleteButtons[0].textContent?.trim()).toBe('Eliminar');
  });

  it('should display the order total', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const orderTotalElement = compiled.querySelector('.get-all-order__total');
    expect(orderTotalElement?.textContent?.trim()).toBe('Total: $12,000.00');
  });

});

