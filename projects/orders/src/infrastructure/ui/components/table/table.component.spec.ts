import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableOrdersComponent } from './table.component';
import { PaginationComponent, TableComponent } from 'shared';
import { By } from '@angular/platform-browser';
import { IOrderRequest } from '../../../../domain/model/order.model';

describe('TableComponent', () => {
  let component: TableOrdersComponent;
  let fixture: ComponentFixture<TableOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOrdersComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('menu', [
      {
        id: 1,
        name: 'Menu de verano',
        dishfoods: [
          {
            id: 19,
            name: 'Coffee express',
            price: 10.0,
            isPopular: false,
            menu: 'Menu de verano',
            orderList: [90],
          },
          {
            id: 20,
            name: 'Plato de salmon',
            price: 10.0,
            isPopular: false,
            menu: 'Menu de verano',
            orderList: [],
          },
          {
            id: 21,
            name: 'plato de frijoles',
            price: 10.0,
            isPopular: false,
            menu: 'Menu de verano',
            orderList: [],
          },
        ],
      },
      { id: 2, name: 'Menu 2', dishfoods: [] },
      { id: 3, name: 'Menu 3', dishfoods: [] },
    ]);

    fixture.componentRef.setInput('client', [
      {
        id: 1,
        name: 'Client 1',
        email: 'client1@email.com',
        isOften: false,
        orderIds: [19],
      },
      {
        id: 2,
        name: 'Client 2',
        email: 'client2@email.com',
        isOften: false,
        orderIds: [20],
      },
      {
        id: 3,
        name: 'Client 3',
        email: 'client3@email.com',
        isOften: false,
        orderIds: [21, 19],
      },
    ]);
    fixture.componentRef.setInput('dataOrders', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render table component', () => {
    const tableElement = fixture.debugElement.query(
      By.directive(TableComponent)
    );
    expect(tableElement).toBeTruthy();
  });

  it('should render pagination component', () => {
    const paginationElement = fixture.debugElement.query(
      By.directive(PaginationComponent)
    );
    expect(paginationElement).toBeTruthy();
  })
  it('should render table component', () => {
    const tableElement = fixture.debugElement.query(By.directive(TableComponent));
    expect(tableElement).toBeTruthy();
  });

  it('redirectToOrder should emit onSelectOrder event', () => {
    spyOn(component.onSelectOrder, 'emit');
    component.redirectToOrder(1);
    expect(component.onSelectOrder.emit).toHaveBeenCalledWith(1);
  });

  it('should emit when createOrder is called', () => {
    const order = { clientId: 1, localDate: '2024-02-01T10:00:00', dishfoodIds: [1, 2, 3] } as unknown as IOrderRequest;
    spyOn(component.createOrderData, 'emit');
    component.createOrder(order);
    expect(component.createOrderData.emit).toHaveBeenCalledWith(order);
  });
  it('should emit when updateOrder is called', () => {
    const order = { clientId: 1, localDate: '2024-02-01T10:00:00', dishfoodIds: [1, 2, 3] } as unknown as IOrderRequest;
    spyOn(component.updateOrderData, 'emit');
    component.UpdateOrder(order);
    expect(component.updateOrderData.emit).toHaveBeenCalledWith({ order, id: 0 });
  });


  it('should close modal when closeModal is called', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
  it('should emit deleteId when sendToDelete is called', () => {
    spyOn(component.deleteId, 'emit');
    component.sendToDelete(1);
    expect(component.deleteId.emit).toHaveBeenCalledWith(1);
  });
});
