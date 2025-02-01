import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientComponent } from './table.component';
import { PaginationComponent, TableComponent } from '../../../../../../shared/src/public-api';
import { UpdateClientFormComponent } from '../../forms/update-client-form/update-client-form.component';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableClientComponent;
  let fixture: ComponentFixture<TableClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableClientComponent, PaginationComponent, TableComponent, UpdateClientFormComponent]
    }).compileComponents();
  
    fixture = TestBed.createComponent(TableClientComponent);
    component = fixture.componentInstance;
  
    // Set the required input value
    fixture.componentRef.setInput('dataClients', []); // Provide an empty array or mocked data
  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteClient event when sendToDelete is called', () => {
    spyOn(component.deleteClient, 'emit');
    component.sendToDelete(1);
    expect(component.deleteClient.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onSelectClient and set clientID when redirectToClient is called', () => {
    spyOn(component.onSelectClient, 'emit');
    component.redirectToClient(2);
    expect(component.onSelectClient.emit).toHaveBeenCalledWith(2);
    expect(component.clientID).toBe(2);
    expect(component.showModal).toBeTrue();
  });
  it('should emit updateClient event when UpdateClient is called', () => {
    spyOn(component.updateClient, 'emit');
    component.clientID = 3;
    const mockClient: IClientRequest = {  name:'', email:'', isOften:false };
    component.UpdateClient(mockClient);
    expect(component.updateClient.emit).toHaveBeenCalledWith({ client: mockClient, id: 3 });
  });

  it('should hide modal when closeModal is called', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should display the correct number of tabs', () => {
    fixture.detectChanges();
    const tabElements = fixture.debugElement.queryAll(By.css('.tab__content'));
    expect(tabElements.length).toBe(2);
  });

});
