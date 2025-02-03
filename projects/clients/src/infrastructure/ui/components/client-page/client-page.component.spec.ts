import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ClientPageComponent } from './client-page.component';
import { ModalComponent } from 'shared';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ClientPageComponent', () => {
  let fixture: ComponentFixture<ClientPageComponent>;
  let component: ClientPageComponent;

  const mockClients = [
    { id: 1, name: 'John', lastName: 'Doe', email: 'john.doe@example.com', frequent: true },
    { id: 2, name: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', frequent: false },
  ];

  const mockCurrentClient = { id: 1, name: 'John', lastName: 'Doe', email: 'john.doe@example.com', frequent: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPageComponent, ModalComponent, ClientFormComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPageComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('clients', mockClients);
    fixture.componentRef.setInput('currentClient', mockCurrentClient);

    fixture.detectChanges();
  });
   
  let modalSpy: jasmine.Spy;
  
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('.client-page__title')).nativeElement;
    expect(titleElement.textContent).toContain('Gestión de Clientes');
  });

  it('should render the description correctly', () => {
    const descriptionElement = fixture.debugElement.query(By.css('.client-page__description')).nativeElement;
    expect(descriptionElement.textContent).toContain('Aquí encontrarás la lista de clientes registrados en el sistema.');
  });

  it('should render client cards correctly', () => {
    const clientCards = fixture.debugElement.queryAll(By.css('.client-table__card'));
    expect(clientCards.length).toBe(mockClients.length);

    clientCards.forEach((card, index) => {
      const client = mockClients[index];
      const nameElement = card.query(By.css('.client-table__card-name')).nativeElement;
      const emailElement = card.query(By.css('.client-table__card-email')).nativeElement;
      const frequentElement = card.query(By.css('.client-table__card-frequent')).nativeElement;

      expect(nameElement.textContent).toContain(`${client.name} ${client.lastName}`);
      expect(emailElement.textContent).toContain(client.email);
      expect(frequentElement.textContent).toContain(client.frequent ? 'Sí' : 'No');
    });
  });

  it('should call selectClient when edit button is clicked', () => {
    spyOn(component, 'selectClient');
    const editButton = fixture.debugElement.query(By.css('.btn--edit')).nativeElement;
    editButton.click();

    expect(component.selectClient).toHaveBeenCalledWith(mockClients[0].id);
  });

  it('should call deleteClient when delete button is clicked', () => {
    spyOn(component, 'deleteClient');
    const deleteButton = fixture.debugElement.query(By.css('.btn--delete')).nativeElement;
    deleteButton.click();

    expect(component.deleteClient).toHaveBeenCalledWith(mockClients[0].id);
  });

  it('should emit onCreateClient when handleSubmit is called', () => {
    spyOn(component.onCreateClient, 'emit');
    const mockModal = jasmine.createSpyObj('ModalComponent', ['toggle']);
    spyOn(component, 'modal').and.returnValue(mockModal);

    const newClient = { id: 3, name: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', frequent: true };
    component.handleSubmit(newClient);

    expect(component.onCreateClient.emit).toHaveBeenCalledWith({ client: newClient, modal: component.modal() });
    expect(mockModal.toggle).toHaveBeenCalled();
  });

  it('should emit onSelectClient when selectClient is called', () => {
    spyOn(component.onSelectClient, 'emit');
    const mockModal = jasmine.createSpyObj('ModalComponent', ['toggle']);
    spyOn(component, 'modal').and.returnValue(mockModal);

    const clientId = 1;
    component.selectClient(clientId);

    expect(component.onSelectClient.emit).toHaveBeenCalledWith(clientId);
    expect(mockModal.toggle).toHaveBeenCalled();
  });

  it('should emit onDelete when deleteClient is called', () => {
    spyOn(component.onDelete, 'emit');

    const clientId = 1;
    component.deleteClient(clientId);

    expect(component.onDelete.emit).toHaveBeenCalledWith(clientId);
  });

  it('should render no client cards when clients input is empty', () => {
    fixture.componentRef.setInput('clients', []);
    fixture.detectChanges();

    const clientCards = fixture.debugElement.queryAll(By.css('.client-table__card'));
    expect(clientCards.length).toBe(0);
  });

  it('should handle toggle modal when modal is undefined', () => {
    fixture.componentRef.setInput('currentClient', undefined);
    fixture.detectChanges();

    expect(() => component.handleSubmit(mockClients[0])).not.toThrow();
  });

  it('should not throw error when selectClient is called with undefined client', () => {
    expect(() => component.selectClient(undefined as any)).not.toThrow();
  });

  it('should not throw error when deleteClient is called with undefined client id', () => {
    expect(() => component.deleteClient(undefined as any)).not.toThrow();
  });

  it('should toggle modal visibility when handleSubmit is called with undefined modal', () => {
    const mockModal = jasmine.createSpyObj('ModalComponent', ['toggle']);
    spyOn(component, 'modal').and.returnValue(mockModal);

    expect(() => component.handleSubmit(mockClients[0])).not.toThrow();
    expect(mockModal.toggle).toHaveBeenCalled();
  });

  // Nuevos tests para cobertura total
  it('should handle handleSubmit with null client', () => {
    expect(() => component.handleSubmit(null as any)).not.toThrow();
  });

  it('should handle selectClient with non-existent client ID', () => {
    expect(() => component.selectClient(999)).not.toThrow();
  });

  it('should handle modal toggle when modal is null or undefined', () => {
    if (!component['modal']) {
      spyOn(component, 'modal').and.returnValue(null);
    }
    
    // Aquí se llama al método que usa el espía
    expect(() => component.handleSubmit(mockClients[0])).not.toThrow();
  });

  it('should not throw error when deleteClient is called with undefined client id', () => {
    expect(() => component.deleteClient(undefined as any)).not.toThrow();
  });

  it('should not throw error when handleSubmit is called with null client', () => {
    expect(() => component.handleSubmit(null as any)).not.toThrow();
  });

  it('should handle selectClient with non-existent client ID (e.g., 999)', () => {
    spyOn(component.onSelectClient, 'emit');
    component.selectClient(999); // Este es un ID que no debería existir
    expect(component.onSelectClient.emit).toHaveBeenCalledWith(999);
  });

  it('should trigger selectClient when the Edit button is clicked', () => {
    spyOn(component, 'selectClient');
    const editButton = fixture.debugElement.query(By.css('.btn--edit')).nativeElement;
    editButton.click();
    expect(component.selectClient).toHaveBeenCalled();
  });
  
  it('should trigger deleteClient when the Delete button is clicked', () => {
    spyOn(component, 'deleteClient');
    const deleteButton = fixture.debugElement.query(By.css('.btn--delete')).nativeElement;
    deleteButton.click();
    expect(component.deleteClient).toHaveBeenCalled();
  });
  
  
});
