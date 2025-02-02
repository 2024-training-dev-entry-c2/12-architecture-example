import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSectionComponent } from './orders-section.component';
import { By } from '@angular/platform-browser';
import { ModalComponent, SearchBarComponent } from 'shared';
import { DebugElement } from '@angular/core';

describe('OrdersSectionComponent', () => {
  let fixture: ComponentFixture<OrdersSectionComponent>;
  let componentRef;
  let component: OrdersSectionComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersSectionComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('orders',
      [
        { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com' }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: 25000, quantity: 2 }], date: new Date('2025-02-02'), total: 50000 },
        { id: 2, client: { id: 2, name: 'Jane Doe', email: 'jane@example.com' }, dishes: [{ dishId: 2, dishName: 'Sushi Roll', price: 30000, quantity: 1 }], date: new Date('2025-02-03'), total: 30000 }
      ] );

    componentRef.setInput('currentOrder',      
        { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com' }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: 25000, quantity: 2 }], date: new Date('2025-02-02'), total: 50000 }
      );

    componentRef.setInput('dishes',
      [
        { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'Disponible', menuId: 101 },
        { id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'Agotado', menuId: 102 }
      ]);

    componentRef.setInput('clients',
      [
        { id: 1, name: 'John Doe', email: 'john@example.com', frequent: true },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', frequent: false }
      ] );

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render orders table', () => {
    const table = compiled.querySelector('lib-order-board');
    expect(table).toBeTruthy();
  });

  it('should render order modal', () => {
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

  it('should render order form', () => {
    const form = compiled.querySelector('lib-order-form');
    expect(form).toBeTruthy();
  });

  it('should call onSave when submit form', () => {
    spyOn(component.onSave, 'emit');
    const order = { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com', frequent : false }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: '25000', quantity: 2 }], date: new Date('2025-02-02'), total: 50000 };
    const modalDebug: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
    const modalInstance = modalDebug.componentInstance as ModalComponent;
    const orderForm: DebugElement = fixture.debugElement.query(By.css('lib-order-form'));
    
    orderForm.triggerEventHandler('onSubmit', order);
    expect(component.onSave.emit).toHaveBeenCalledWith({order: order, modal: modalInstance});
  });

  it('should call onSelect when select an order', () => {
    spyOn(component.onSelectToUpdate, 'emit');
    const orderBoard: DebugElement = fixture.debugElement.query(By.css('lib-order-board'));

    orderBoard.triggerEventHandler('onSelectOrderToUpdate', 1);
    expect(component.onSelectToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call onDelete when submit to delete an order', () => {
    spyOn(component.onDelete, 'emit');
    const deleteModal: DebugElement = fixture.debugElement.query(By.css('lib-delete-modal'));

    deleteModal.triggerEventHandler('onDelete', 1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should have orders in the input', () => {
    expect(2).toBe(component.orders().length);
  });

  it('should open create modal when action button is clicked', () => {
    spyOn(component, 'openCreateModal');
    
    const modal = fixture.debugElement.query(By.directive(ModalComponent));
    modal.triggerEventHandler('onOpenByBtn', null);
  
    expect(component.openCreateModal).toHaveBeenCalled();
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');
  
    const order = { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com', frequent : false }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: '25000', quantity: 2 }], date: new Date('2025-02-02'), total: 50000 };
    const orderForm = fixture.debugElement.query(By.css('lib-order-form'));
    orderForm.triggerEventHandler('onSubmit', order);
  
    expect(component.handleSubmit).toHaveBeenCalled();
  });
  
  it('should update filtered orders when search is performed', () => {

    const order = { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com', frequent : false }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: '25000', quantity: 2 }], date: new Date('2025-02-02'), total: 50000 };
    const searchBar = fixture.debugElement.query(By.directive(SearchBarComponent));
    searchBar.triggerEventHandler('onFilteredData', [order]);
  
    expect(component.filteredOrders).toEqual([
      { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com', frequent : false }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: '25000', quantity: 2 }], date: new Date('2025-02-02'), total: 50000 },
    ]);
  });
});
