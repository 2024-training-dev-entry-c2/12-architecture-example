import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBoardComponent } from './client-board.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ClientBoardComponent', () => {
  let fixture : ComponentFixture<ClientBoardComponent>;
  let componentRef;
  let component : ClientBoardComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBoardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();      

    fixture = TestBed.createComponent(ClientBoardComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('clients',
      [
        { id: 1, name: 'John Doe', email: 'john@example.com', frequent: true },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', frequent: false }
      ]);
      
    fixture.detectChanges();
    component = fixture.componentInstance;  
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render client titles in table', () => {
    const titles = compiled.querySelectorAll('th');
    const titlesText =  Array.from(titles).map(title => title.textContent.trim());
    expect(titlesText).toEqual(['Nombre', 'Correo Electrónico', '¿Es Frecuente?', 'Acciones']);
  });

  it('should render client data in table rows', () => {  
    const rows = compiled.querySelectorAll('tbody tr.client-table__column');

    expect(rows.length).toBe(component.clients().length);
    
    const firstRow = rows[0];
    const firstNameCell = firstRow.querySelector('td.client-table__item');
    expect(firstNameCell.innerHTML).toBe('John Doe');
  });

  it('should call handleSelectUpdate when update is selected', () => {
    spyOn(component.onSelectClientToUpdate, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectUpdate', 1);
    expect(component.onSelectClientToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call handleSelectDelete when delete is selected', () => {
    spyOn(component.onSelectClientToDelete, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectDelete', 1);
    expect(component.onSelectClientToDelete.emit).toHaveBeenCalledWith(1);
  });
});
