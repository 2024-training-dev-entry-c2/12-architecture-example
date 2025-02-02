import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBoardComponent } from './order-board.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrderBoardComponent', () => {
  let fixture: ComponentFixture<OrderBoardComponent>;
  let componentRef;
  let component: OrderBoardComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBoardComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('orders',
      [
        { id: 1, client: { id: 1, name: 'John Doe', email: 'john@example.com' }, dishes: [{ dishId: 1, dishName: 'Pasta Alfredo', price: 25000, quantity: 2 }], date: new Date('2025-02-02'), total: 50000 },
        { id: 2, client: { id: 2, name: 'Jane Doe', email: 'jane@example.com' }, dishes: [{ dishId: 2, dishName: 'Sushi Roll', price: 30000, quantity: 1 }], date: new Date('2025-02-03'), total: 30000 }
      ]
    )

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render order titles in table', () => {
    const titles = compiled.querySelectorAll('th');
    const titlesText =  Array.from(titles).map(title => title.textContent.trim());
    expect(titlesText).toEqual(['Fecha', 'Cliente', 'Platos', 'Total', 'Acciones']);
  });

  it('should render order data in table rows', () => {  
    const rows = compiled.querySelectorAll('tbody tr.order-table__column');

    expect(rows.length).toBe(component.orders().length);
    
    const firstRow = rows[0];
    const firstNameCell = firstRow.querySelector('td.order-table__item');
    expect(firstNameCell.innerHTML).toBe('Feb 1, 2025');
  });

  it('should call handleSelectUpdate when update is selected', () => {
    spyOn(component.onSelectOrderToUpdate, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectUpdate', 1);
    expect(component.onSelectOrderToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call handleSelectDelete when delete is selected', () => {
    spyOn(component.onSelectOrderToDelete, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectDelete', 1);
    expect(component.onSelectOrderToDelete.emit).toHaveBeenCalledWith(1);
  });
});
