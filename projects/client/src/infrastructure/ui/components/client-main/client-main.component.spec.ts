import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientMainComponent } from './client-main.component';
import { IClient } from '../../../../domain/model/clients.model';
import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ClientMainComponent', () => {
  let component: ClientMainComponent;
  let fixture: ComponentFixture<ClientMainComponent>;

  const mockClients: IClient[] = [
    { idClient: 1, clientName: 'John Doe', email: 'john@example.com', phoneNumber: '123456789', address: '123 Main St', registrationDate: new Date(), frequentUser: true, vip: false },
    { idClient: 2, clientName: 'Jane Smith', email: 'jane@example.com', phoneNumber: '987654321', address: '456 Elm St', registrationDate: new Date(), frequentUser: false, vip: true }
  ];

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of clients in the table', () => {
    fixture.detectChanges(); 
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockClients.length);
  });

  it('should emit deleteClientEvent when delete action is triggered', () => {
    spyOn(component.deleteClientEvent, 'emit');

    fixture.detectChanges();
    const deleteButton = fixture.debugElement.queryAll(By.css('.client__button--delete'))[0];
    deleteButton.triggerEventHandler('click', null);

    expect(component.deleteClientEvent.emit).toHaveBeenCalledWith(mockClients[0].idClient);
  });

  it('should emit editClientEvent when edit action is triggered', () => {
    spyOn(component.editClientEvent, 'emit');

    fixture.detectChanges(); 
    const editButton = fixture.debugElement.queryAll(By.css('.client__button--edit'))[0];
    editButton.triggerEventHandler('click', null);

    expect(component.editClientEvent.emit).toHaveBeenCalledWith(mockClients[0]);
  });

  it('should call getHeaders and return the correct headers', () => {
    const headers = component.getHeaders();
    expect(headers.length).toBe(9);
    expect(headers[0].label).toBe('Cliente ID');
    expect(headers[8].label).toBe('Acciones');
  });

  it('should call getActions and return the correct actions', () => {
    const actions = component.getActions();
    expect(actions.length).toBe(2); 
    expect(actions[0].label).toBe('Editar');
    expect(actions[1].label).toBe('Eliminar');
  });
});
