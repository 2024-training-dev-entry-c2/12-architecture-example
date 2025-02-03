import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionClientsComponent } from './section-clients.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddModalComponent } from '../../forms/add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';
import { IClients } from '../../../../domain/model/clients.model';
import { ModalComponent } from 'shared';

fdescribe('SectionClientsComponent', () => {
  let component: SectionClientsComponent;
  let fixture: ComponentFixture<SectionClientsComponent>;
  let formBuilder: FormBuilder;

  const mockClients: IClients[] = [
    {
      id: 1,
      name: 'Juan Perez',
      email: 'juan@gmail.com',
      totalOrders: 1,
      userType: 'REGULAR',
      orders: [
        {
          id: 1,
          orderDate: '2025-01-31 20:45:11',
          totalPrice: 50000,
          clientId: 1,
          clientName: 'Juan Perez',
          clientEmail: 'juan@gmail.com',
          dishes: []
        }
      ]
    },
    {
      id: 2,
      name: 'Maria Sanchez',
      email: 'maria@gmail.com',
      totalOrders: 2,
      userType: 'FREQUENT',
      orders: [
        {
          id: 2,
          orderDate: '2025-01-31 20:45:11',
          totalPrice: 75000,
          clientId: 2,
          clientName: 'Maria Sanchez',
          clientEmail: 'maria@gmail.com',
          dishes: []
        },
        {
          id: 3,
          orderDate: '2025-01-31 20:45:11',
          totalPrice: 60000,
          clientId: 2,
          clientName: 'Maria Sanchez',
          clientEmail: 'maria@gmail.com',
          dishes: []
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SectionClientsComponent,
        ModalComponent,
        AddModalComponent,
        RemoveModalComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(SectionClientsComponent);
    component = fixture.componentInstance;
    
    component.clients = mockClients;
    component.formData = [
      { labelName: 'Name', valueLabel: 'name' },
      { labelName: 'Email', valueLabel: 'email' },
      { labelName: 'User Type', valueLabel: 'userType' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display correct number of table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(component.tableHeaders.length);
  });

  it('should display correct header titles', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    component.tableHeaders.forEach((header, index) => {
      expect(headers[index].textContent.trim()).toBe(header);
    });
  });

  it('should display correct number of clients', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockClients.length);
  });

  it('should display correct client information', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const columns = firstRow.querySelectorAll('td');
    
    expect(columns[0].textContent.trim()).toBe(mockClients[0].id.toString());
    expect(columns[1].textContent.trim()).toBe(mockClients[0].name);
    expect(columns[2].textContent.trim()).toBe(mockClients[0].email);
    expect(columns[3].textContent.trim()).toBe(mockClients[0].totalOrders.toString());
    expect(columns[4].textContent.trim()).toBe(mockClients[0].userType);
  });

  it('should emit addClient event when clicking Add Client button', () => {
    spyOn(component.addClient, 'emit');
    const addButton = fixture.nativeElement.querySelector('.container__content-btn--add');
    
    addButton.click();
    
    expect(component.addClient.emit).toHaveBeenCalled();
  });

  it('should emit editClient event with client data when clicking Edit button', () => {
    spyOn(component.editClient, 'emit');
    const editButton = fixture.nativeElement.querySelector('.container__content-btn--edit');
    
    editButton.click();
    
    expect(component.editClient.emit).toHaveBeenCalledWith(mockClients[0]);
  });

  it('should emit deleteClient event with client data when clicking Delete button', () => {
    spyOn(component.deleteClient, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.container__content-btn--delete');
    
    deleteButton.click();
    
    expect(component.deleteClient.emit).toHaveBeenCalledWith(mockClients[0]);
  });

  it('should emit saveClient event when onSave is called', () => {
    spyOn(component.saveClient, 'emit');
    component.onSave({'name': 'Juan Perez', 'email': 'juan@gmail.com', 'userType': 'REGULAR'});
    expect(component.saveClient.emit).toHaveBeenCalled();
  });

  it('should emit closeModal event when onCloseModal is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onCloseModal();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit confirmDelete event when onDelete is called', () => {
    spyOn(component.confirmDelete, 'emit');
    component.onDelete();
    expect(component.confirmDelete.emit).toHaveBeenCalled();
  });

  it('should show add modal title when modalType is add', () => {
    component.modalType = 'add';
    component.isModalOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('lib-modal');
    expect(modal.getAttribute('ng-reflect-title')).toBe('Add Client');
  });

  it('should show edit modal title when modalType is edit', () => {
    component.modalType = 'edit';
    component.isModalOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('lib-modal');
    expect(modal.getAttribute('ng-reflect-title')).toBe('Edit Client');
  });

  it('should show delete modal title when modalType is delete', () => {
    component.modalType = 'delete';
    component.isModalOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('lib-modal');
    expect(modal.getAttribute('ng-reflect-title')).toBe('Delete Client');
  });

  it('should display the correct page title', () => {
    const title = fixture.nativeElement.querySelector('.container__content-title');
    expect(title.textContent.trim()).toBe("Gusteau's Clients Details");
  });

});