import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponentComponent } from './client-component.component';
import { By } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { IClient } from '../../../../domain/model/client.model';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';

describe('ClientComponentComponent', () => {
  let component: ClientComponentComponent;
  let fixture: ComponentFixture<ClientComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponentComponent);
    fixture.componentRef.setInput('clients', [
      {
        id: 1,
        nombre: 'Client 1',
        email: 'client1@example.com',
        telefono: '123-456-7890',
      },
      {
        id: 2,
        nombre: 'Client 2',
        email: 'client2@example.com',
        telefono: '987-654-3210',
      },
    ]);
    fixture.componentRef.setInput('clientSelected', {
      id: 1,
      nombre: 'Client 1',
      email: 'client1@example.com',
      telefono: '123-456-7890',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No hay clientes" when clients list is empty', () => {
    fixture.componentRef.setInput('clients', []);
    fixture.detectChanges();
    const noClientsElement = fixture.debugElement.query(By.css('span'));
    expect(noClientsElement.nativeElement.textContent).toContain(
      'No hay clientes'
    );
  });
  it('should display a list of clients when clients list is not empty', () => {
    const clientElements = fixture.debugElement.queryAll(By.css('lib-card'));
    expect(clientElements.length).toBe(component.clients().length);
  });

  it('should pass name, email, and tel to lib-card', () => {
    const cardComponent = fixture.debugElement.query(
      By.directive(CardComponent)
    ).componentInstance;
    expect(cardComponent.name()).toBe(component.clients()[0].nombre);
    expect(cardComponent.email()).toBe(component.clients()[0].email);
    expect(cardComponent.tel()).toBe(component.clients()[0].telefono);
  });

  it('should emit selectedToDelete event when delete is called', () => {
    spyOn(component.selectedToDelete, 'emit');
    const clientId = 1;
    component.delete(clientId);
    expect(component.selectedToDelete.emit).toHaveBeenCalledWith(clientId);
  });

  it('should emit selectedToUpdate event when selectToUpdate is called', () => {
    spyOn(component.selectedToUpdate, 'emit');
    const client: IClient = {
      id: 1,
      nombre: 'Client 1',
      email: 'client1@example.com',
      telefono: '123-456-7890',
      tipoCliente: '',
    };
    component.selectToUpdate(client);
    expect(component.selectedToUpdate.emit).toHaveBeenCalledWith(client);
  });

  it('should pass clientSelected to lib-client-form', () => {
    const clientFormComponent = fixture.debugElement.query(
      By.directive(ClientFormComponent)
    ).componentInstance;
    expect(clientFormComponent.clientSelected()).toBe(component.clientSelected());
  });

});
