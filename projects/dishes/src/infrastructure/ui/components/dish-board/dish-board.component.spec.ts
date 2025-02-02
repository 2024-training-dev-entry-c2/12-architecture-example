import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishBoardComponent } from './dish-board.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DishBoardComponent', () => {
  let fixture: ComponentFixture<DishBoardComponent>;
  let componentRef;
  let component: DishBoardComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishBoardComponent);
    componentRef = fixture.componentRef;

    componentRef.setInput('dishes',
      [
        { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 },
        { id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'POPULAR', menuId: 102 }
      ]);
    
    componentRef.setInput('menus',
      [
        { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] },
        { id: 102, name: 'Menú Japonés', dishes: [{ id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'POPULAR', menuId: 102 }] }
      ]);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dishes titles in table', () => {
    const titles = compiled.querySelectorAll('th');
    const titlesText =  Array.from(titles).map(title => title.textContent.trim());
    expect(titlesText).toEqual(['Nombre', 'Descripción', 'Precio', 'Tipo De Plato', 'Menú', 'Acciones']);
  });

  it('should render dishes data in table rows', () => {  
    const rows = compiled.querySelectorAll('tbody tr.dish-table__column');

    expect(rows.length).toBe(component.dishes().length);
    
    const firstRow = rows[0];
    const firstNameCell = firstRow.querySelector('td.dish-table__item');
    expect(firstNameCell.innerHTML).toBe('Pasta Alfredo');
  });

  it('should call handleSelectUpdate when update is selected', () => {
    spyOn(component.onSelectDishToUpdate, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectUpdate', 1);
    expect(component.onSelectDishToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call handleSelectDelete when delete is selected', () => {
    spyOn(component.onSelectDishToDelete, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectDelete', 1);
    expect(component.onSelectDishToDelete.emit).toHaveBeenCalledWith(1);
  });


});
