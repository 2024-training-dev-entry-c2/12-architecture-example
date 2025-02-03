import { TestBed } from '@angular/core/testing';
import { TableOrderComponent } from './table-order.component';
import { Iorder } from '../../../../domain/model/orders.model';

describe('TableOrderComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(TableOrderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Encabezados de la tabla', () => {
    const fixture = TestBed.createComponent(TableOrderComponent);
    const app = fixture.componentInstance;
    expect(app.itemsTable).toEqual([
      'ID Orden',
      'Cliente',
      'Platos',
      'Total',
      'Estado',
      'Fecha',
      'Acciones',
    ]);
  });

  it('onCreateOrder al llama handleSubmit', () => {
    const fixture = TestBed.createComponent(TableOrderComponent);
    const app = fixture.componentInstance;
    spyOn(app.onCreateOrder, 'emit');
    const order: any = {
      id: 1,
      client: 'juan',
      dishes: [],
      total: 100,
      date: '2021-10-10',
    } as Iorder;
    app.handleSubmit(order);
    expect(app.onCreateOrder.emit).toHaveBeenCalledWith(order);
  });

  it('Debe llamar al modal', () => {
    const fixture = TestBed.createComponent(TableOrderComponent);
    const app = fixture.componentInstance;
    spyOn(app.onSelectOrder, 'emit');
    spyOn(app.modal(), 'toggle');

    app.selectOrder(2);

    expect(app.onSelectOrder.emit).toHaveBeenCalledWith(2);
    expect(app.modal().toggle).toHaveBeenCalled();
  });

  it('onDeleteOrder ', () => {
    const fixture = TestBed.createComponent(TableOrderComponent);
    const app = fixture.componentInstance;
    spyOn(app.onDeleteOrder, 'emit');
    const id = 3;
    expect(typeof id).toBe('number');
    app.deleteOrder(id);
    expect(app.onDeleteOrder.emit).toHaveBeenCalledWith(id);
  });
});
