import { TestBed } from '@angular/core/testing';
import { TableClientsComponent } from './table-clients.component';
import { Iclient } from 'clients';

describe('TableClientsComponent', () => {
  it('itemTable', () => {
    const fixture = TestBed.createComponent(TableClientsComponent);
    const app = fixture.componentInstance;
    expect(app.itemsTable).toEqual([
      'Nombre',
      'Email',
      'Teléfono',
      'Dirección',
      'Fecha de creación',
      'Acciones',
    ]);
  });

  it('handleSubmit', () => {
    const fixture = TestBed.createComponent(TableClientsComponent);
    const app = fixture.componentInstance;

    const client: Iclient = {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      phone: 123456789,
      address: 'test address',
      isFrequent: true,
      fechaCreacion: '2023-01-01',
    };

    spyOn(app.onCreateClient, 'emit');
    app.handleSubmit(client);
    expect(app.onCreateClient.emit).toHaveBeenCalledWith({
      client: client,
      modal: app.modal(),
    });
  });

  it('onSelect', () => {
    const fixture = TestBed.createComponent(TableClientsComponent);
    const app = fixture.componentInstance;
    spyOn(app.onSelectClient, 'emit');
    spyOn(app.modal(), 'toggle');

    const id = 2;
    expect(typeof id).toBe('number');
    app.selectClient(id);

    expect(app.onSelectClient.emit).toHaveBeenCalledWith(id);
    expect(app.modal().toggle).toHaveBeenCalled();
  });

  it('onDeleteClient', () => {
    const fixture = TestBed.createComponent(TableClientsComponent);
    const app = fixture.componentInstance;
    spyOn(app.onDeleteClient, 'emit');
    const id = 3;
    expect(typeof id).toBe('number');
    app.deleteClient(id);
    expect(app.onDeleteClient.emit).toHaveBeenCalledWith(3);
  });
});
