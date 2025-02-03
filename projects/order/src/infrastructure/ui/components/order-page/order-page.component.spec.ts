import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { OrderPageComponent } from './order-page.component';
import { ModalComponent } from 'shared';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { IOrder, IDish, IClient } from '../../../../domain/model/order.model';

describe('OrderPageComponent', () => {
  let fixture: ComponentFixture<OrderPageComponent>;
  let component: OrderPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPageComponent, ModalComponent, OrderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
  });

  it('should render title and description correctly', () => {
    // Proveer inputs mínimos para evitar errores en el template
    fixture.componentRef.setInput('orders', []);
    fixture.componentRef.setInput('dishes', []);
    fixture.componentRef.setInput('clients', []);
    fixture.componentRef.setInput('currentOrder', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.order__title').textContent).toContain('Lista de Órdenes');
    expect(compiled.querySelector('.order__description').textContent).toContain('Aquí puedes ver todas las órdenes realizadas por los orderes.');
  });

  it('should render order cards with correct details', () => {
    // Definimos un array de órdenes usando las interfaces correctas.
    const testOrders: IOrder[] = [
      {
        id: 1,
        clientId: 'client-1',
        dishes: [
          {
            id: 1,
            name: 'Dish A',
            description: 'Delicious Dish A',
            price: 10,
            specialDish: false,
          },
          {
            id: 2,
            name: 'Dish B',
            description: 'Tasty Dish B',
            price: 20,
            specialDish: true,
          }
        ],
        total: 30,
      },
      {
        id: 2,
        clientId: 'client-2',
        dishes: [
          {
            id: 3,
            name: 'Dish C',
            description: 'Yummy Dish C',
            price: 15,
            specialDish: false,
          }
        ],
        total: 15,
      }
    ];

    fixture.componentRef.setInput('orders', testOrders);
    // Inputs mínimos para evitar errores (en caso de que el template use dishes o clients)
    fixture.componentRef.setInput('dishes', []);
    fixture.componentRef.setInput('clients', []);
    fixture.componentRef.setInput('currentOrder', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const orderCards = compiled.querySelectorAll('.order__card');
    expect(orderCards.length).toBe(2);

    // Verificar la información del primer order card
    const firstCard = orderCards[0];
    expect(firstCard.querySelector('.order__card-title').textContent).toContain('Orden #1');
    expect(firstCard.querySelector('.order__card-order').textContent).toContain('Ordere ID: 1');

    // Verificar la lista de platillos del primer order
    const dishListItems = firstCard.querySelectorAll('.order__card-dish');
    expect(dishListItems.length).toBe(2);
    expect(dishListItems[0].querySelector('.order__card-dish-name').textContent).toContain('Dish A');
    expect(dishListItems[0].querySelector('.order__card-dish-price').textContent).toContain('$');
    // Verificar que el total se muestra con símbolo de moneda (la salida del pipe currency puede variar)
    expect(firstCard.querySelector('.order__card-total').textContent).toContain('$');
  });

  it('should emit onCreateOrder and toggle modal when handleSubmit is called', () => {
    // Creamos un fake modal con las propiedades requeridas por ModalComponent.
    const fakeModal: ModalComponent = {
      toggle: jasmine.createSpy('toggle'),
      acton: 'dummy',
      visiblets: false
    } as any;
    // Asignamos el modal como un signal.
    component.modal = signal(fakeModal) as any;
    spyOn(component.onCreateOrder, 'emit');

    const testOrder: IOrder = {
      id: 1,
      clientId: 'client-1',
      dishes: [
        {
          id: 1,
          name: 'Dish A',
          description: 'Delicious Dish A',
          price: 10,
          specialDish: false,
        }
      ],
      total: 10,
    };

    component.handleSubmit(testOrder);
    expect(component.onCreateOrder.emit).toHaveBeenCalledWith({ order: testOrder, modal: fakeModal });
    expect(fakeModal.toggle).toHaveBeenCalled();
  });

  it('should emit onSelectOrder and toggle modal when selectOrder is called', () => {
    const fakeModal: ModalComponent = {
      toggle: jasmine.createSpy('toggle'),
      acton: 'dummy',
      visiblets: false
    } as any;
    component.modal = signal(fakeModal) as any;
    spyOn(component.onSelectOrder, 'emit');

    const orderId = 1;
    component.selectOrder(orderId);
    expect(component.onSelectOrder.emit).toHaveBeenCalledWith(orderId);
    expect(fakeModal.toggle).toHaveBeenCalled();
  });

  it('should emit onDelete when deleteOrder is called', () => {
    spyOn(component.onDelete, 'emit');

    const orderId = 1;
    component.deleteOrder(orderId);
    expect(component.onDelete.emit).toHaveBeenCalledWith(orderId);
  });

  it('should render the order form inside the modal with proper bindings', () => {
    // Configuramos inputs para currentOrder, dishes y clients usando las interfaces correctas.
    const testOrder: IOrder = {
      id: 1,
      clientId: 'client-1',
      dishes: [
        {
          id: 1,
          name: 'Dish A',
          description: 'Delicious Dish A',
          price: 10,
          specialDish: false,
        }
      ],
      total: 10,
    };

    const testDishes: IDish[] = [
      {
        id: 1,
        name: 'Dish A',
        description: 'Delicious Dish A',
        price: 10,
        specialDish: false,
        menu: { id: 1, name: 'Menu 1' }
      }
    ];

    const testClients: IClient[] = [
      {
        id: 1,
        name: 'Client A',
        lastName: 'Lastname',
        email: 'clientA@example.com',
        frequent: true,
      }
    ];

    fixture.componentRef.setInput('currentOrder', testOrder);
    fixture.componentRef.setInput('dishes', testDishes);
    fixture.componentRef.setInput('clients', testClients);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const modalElement = compiled.querySelector('lib-modal');
    expect(modalElement).toBeTruthy();

    const orderForm = modalElement.querySelector('lib-order-form');
    expect(orderForm).toBeTruthy();
    // Se verifica que los bindings se hayan pasado a través de atributos reflejados.
    expect(orderForm.getAttribute('ng-reflect-order')).toBeTruthy();
    expect(orderForm.getAttribute('ng-reflect-dishes')).toBeTruthy();
    expect(orderForm.getAttribute('ng-reflect-clients')).toBeTruthy();
  });
});
