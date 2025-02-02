import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionOrdersComponent } from './section-orders.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'shared';
import { AddModalComponent } from '../../forms/add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';
import { IOrders } from '../../../../domain/model/orders.model';

fdescribe('SectionOrdersComponent', () => {
  let component: SectionOrdersComponent;
  let fixture: ComponentFixture<SectionOrdersComponent>;
  let formBuilder: FormBuilder;

  const mockOrders: IOrders[] = [
    {
      id: 1,
      orderDate: '2025-01-31T20:26:52',
      totalPrice: 45000,
      clientId: 101,
      clientName: 'client1',
      clientEmail: 'client1@email.com',
      dishes: [
        {
          id: 1,
          name: 'Pizza Margherita',
          price: 25000,
          menuId: 1,
          menuName: 'Italian Menu',
          dishType: 'Main Course',
          totalOrdered: 1
        },
        {
          id: 2,
          name: 'Pasta Carbonara',
          price: 20000,
          menuId: 1,
          menuName: 'Italian Menu',
          dishType: 'Main Course',
          totalOrdered: 1
        }
      ]
    },
    {
      id: 2,
      orderDate:'2025-01-31T20:30:00',
      totalPrice: 15000,
      clientId: 102,
      clientName: 'client2',
      clientEmail: 'client2@email.com',
      dishes: [
        {
          id: 3,
          name: 'Tacos',
          price: 15000,
          menuId: 2,
          menuName: 'Mexican Menu',
          dishType: 'Main Course',
          totalOrdered: 1
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SectionOrdersComponent,
        ModalComponent,
        AddModalComponent,
        RemoveModalComponent,
        DatePipe,
        CurrencyPipe
      ],
      providers: [FormBuilder, DatePipe, CurrencyPipe]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(SectionOrdersComponent);
    component = fixture.componentInstance;

    component.orderForm = formBuilder.group({
      clientId: [''],
      clientEmail: [''],
      dishes: ['']
    });

    component.orders = mockOrders;
    component.formData = [
      { labelName: 'Client ID', valueLabel: 'clientId' },
      { labelName: 'Client Email', valueLabel: 'clientEmail' }
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

  it('should display correct number of orders', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockOrders.length);
  });

  it('should display correct order information', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const columns = firstRow.querySelectorAll('td');
    
    expect(columns[0].textContent.trim()).toBe(mockOrders[0].id.toString());
    expect(columns[2].textContent.trim()).toContain('COP 45,000.00'); // Total price
    expect(columns[3].textContent.trim()).toBe(mockOrders[0].clientId.toString());
    expect(columns[4].textContent.trim()).toBe(mockOrders[0].clientEmail);
    expect(columns[1].textContent.trim()).toBe('Jan 31, 2025, 8:26:52 PM');

    
  });

  it('should emit addOrder event when clicking Add Order button', () => {
    spyOn(component.addOrder, 'emit');
    const addButton = fixture.nativeElement.querySelector('.container__content-btn--add');
    
    addButton.click();
    
    expect(component.addOrder.emit).toHaveBeenCalled();
  });

  it('should emit editOrder event with order data when clicking Edit button', () => {
    spyOn(component.editOrder, 'emit');
    const editButton = fixture.nativeElement.querySelector('.container__content-btn--edit');
    
    editButton.click();
    
    expect(component.editOrder.emit).toHaveBeenCalledWith(mockOrders[0]);
  });

  it('should emit deleteOrder event with order data when clicking Delete button', () => {
    spyOn(component.deleteOrder, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.container__content-btn--delete');
    
    deleteButton.click();
    
    expect(component.deleteOrder.emit).toHaveBeenCalledWith(mockOrders[0]);
  });


  it('should emit saveOrder event when onSave is called', () => {
    spyOn(component.saveOrder, 'emit');
    component.onSave(mockOrders[0]);
    expect(component.saveOrder.emit).toHaveBeenCalled();
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

  it('should display correct number of dishes for each order', () => {
    const dishesLists = fixture.nativeElement.querySelectorAll('.container__content-dishes--list');
    
    dishesLists.forEach((list: HTMLElement, index: number) => {
      const dishes = list.querySelectorAll('.container__content-dishes--items');
      expect(dishes.length).toBe(mockOrders[index].dishes.length);
    });
  });

  it('should display the correct page title', () => {
    const title = fixture.nativeElement.querySelector('.container__content-title');
    expect(title.textContent.trim()).toBe("Gusteau's Orders Details");
  });

  it('should format the date correctly', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const dateCell = firstRow.querySelectorAll('td')[1];
    expect(dateCell.textContent).toContain('Jan 31, 2025');
  });

  it('should format the currency correctly', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    const priceCell = firstRow.querySelectorAll('td')[2];
    expect(priceCell.textContent.trim()).toContain('COP 45,000.00');
  });
});