import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { GetByIdOrderCompComponent } from './get-by-id-order-comp.component';
import { IOrder } from '../../../../domain/model/order.model';

describe('GetByIdOrderCompComponent', () => {
  let component: GetByIdOrderCompComponent;
  let fixture: ComponentFixture<GetByIdOrderCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdOrderCompComponent, CurrencyPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetByIdOrderCompComponent);
    component = fixture.componentInstance;

    component.order = {
      "id": 50,
      "idCliente": 3,
      "detalles": [
        {
          "cantidad": 1,
          "precio": 5000.0,
          "idPlato": 13,
          "nombrePlato": "Arroz Blanco"
        },
        {
          "cantidad": 2,
          "precio": 7000.0,
          "idPlato": 14,
          "nombrePlato": "Arepa de Huevo"
        }
      ],
      "total": 12000.0,
      "estado": "PENDIENTE",
      "fechaPedido": [
        2025,
        1,
        27,
        3,
        45,
        54,
        820364000
      ]
    } as IOrder;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the client ID', () => {
    const compiled = fixture.nativeElement;
    const clientIdElement = compiled.querySelector('p');

    expect(clientIdElement.textContent).toContain(`Cliente ID: ${component.order.idCliente}`);
  });


});
