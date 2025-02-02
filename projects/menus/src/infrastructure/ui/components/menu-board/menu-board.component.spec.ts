import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoardComponent } from './menu-board.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MenuBoardComponent', () => {
  let fixture: ComponentFixture<MenuBoardComponent>;
  let componentRef;
  let component: MenuBoardComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBoardComponent);
    componentRef = fixture.componentRef;

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

  it('should render menu titles in table', () => {
    const titles = compiled.querySelectorAll('th');
    const titlesText =  Array.from(titles).map(title => title.textContent.trim());
    expect(titlesText).toEqual(['Nombre', 'Platos', 'Acciones']);
  });

  it('should render menu data in table rows', () => {  
    const rows = compiled.querySelectorAll('tbody tr.menu-table__column');

    expect(rows.length).toBe(component.menus().length);
    
    const firstRow = rows[0];
    const firstNameCell = firstRow.querySelector('td.menu-table__item');
    expect(firstNameCell.innerHTML).toBe('Menú Italiano');
  });

  it('should render list dishes in table rows', () => {  
    const dishesList = compiled.querySelector('lib-dishes-list');
    expect(dishesList).toBeTruthy();
  });

  it('should call handleSelectUpdate when update is selected', () => {
    spyOn(component.onSelectmenuToUpdate, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectUpdate', 1);
    expect(component.onSelectmenuToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call handleSelectDelete when delete is selected', () => {
    spyOn(component.onSelectmenuToDelete, 'emit');

    const cellOptions: DebugElement = fixture.debugElement.query(By.css('lib-cell-options'));
    cellOptions.triggerEventHandler('onSelectDelete', 1);
    expect(component.onSelectmenuToDelete.emit).toHaveBeenCalledWith(1);
  });

});
