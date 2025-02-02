import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSectionComponent } from './clients-section.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DeleteModalComponent, ModalComponent, SearchBarComponent } from 'shared';

describe('ClientsSectionComponent', () => {
  let fixture: ComponentFixture<ClientsSectionComponent>;
  let componentRef;
  let component: ClientsSectionComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsSectionComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('clients',
      [
        { id: 1, name: 'John Doe', email: 'john@example.com', frequent: true },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', frequent: false }
      ]);

    componentRef.setInput('currentClient',
        { id: 1, name: 'John Doe', email: 'john@example.com', frequent: true },
      );
      
    fixture.detectChanges();
    
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render clients table', () => {
    const table = compiled.querySelector('lib-client-board');
    expect(table).toBeTruthy();
  });

  it('should render clients modal', () => {
    const modal = compiled.querySelector('lib-modal');
    expect(modal).toBeTruthy();
  });

  it('should render delete modal', () => {
    const modal = compiled.querySelector('lib-delete-modal');
    expect(modal).toBeTruthy();
  });

  it('should render search bar', () => {
    const searchBar = compiled.querySelector('lib-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('should render client form', () => {
    const form = compiled.querySelector('lib-client-form');
    expect(form).toBeTruthy();
  });

  it('should call onSave when submit form', () => {
    spyOn(component.onSave, 'emit');
    const client = { id: 1, name: 'John Doe', email: 'john@example.com', frequent: true };
    const modalDebug: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
    const modalInstance = modalDebug.componentInstance as ModalComponent;
    const clientForm: DebugElement = fixture.debugElement.query(By.css('lib-client-form'));
    
    clientForm.triggerEventHandler('onSubmit', client);
    expect(component.onSave.emit).toHaveBeenCalledWith({client: client, modal: modalInstance});
  });

  it('should call onSelect when select a client', () => {
    spyOn(component.onSelectToUpdate, 'emit');
    const clientBoard: DebugElement = fixture.debugElement.query(By.css('lib-client-board'));

    clientBoard.triggerEventHandler('onSelectClientToUpdate', 1);
    expect(component.onSelectToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call onDelete when submit to delete a client', () => {
    spyOn(component.onDelete, 'emit');
    const clientBoard: DebugElement = fixture.debugElement.query(By.css('lib-delete-modal'));

    clientBoard.triggerEventHandler('onDelete', 1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should have clients in the input', () => {
    expect(2).toBe(component.clients().length);
  });

  it('should open create modal when action button is clicked', () => {
    spyOn(component, 'openCreateModal');
    
    const modal = fixture.debugElement.query(By.directive(ModalComponent));
    modal.triggerEventHandler('onOpenByBtn', null);
  
    expect(component.openCreateModal).toHaveBeenCalled();
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');
  
    const clientForm = fixture.debugElement.query(By.css('lib-client-form'));
    clientForm.triggerEventHandler('onSubmit', { id: 3, name: 'Carlos Pérez', email: 'carlos@example.com', frequent: false });
  
    expect(component.handleSubmit).toHaveBeenCalled();
  });
  
  it('should update filtered clients when search is performed', () => {

    const searchBar = fixture.debugElement.query(By.directive(SearchBarComponent));
    searchBar.triggerEventHandler('onFilteredData', [{ id: 2, name: 'Jane Doe', email: 'jane@example.com', frequent: false }]);
  
    expect(component.filteredClients).toEqual([
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', frequent: false },
    ]);
  });
  
});
