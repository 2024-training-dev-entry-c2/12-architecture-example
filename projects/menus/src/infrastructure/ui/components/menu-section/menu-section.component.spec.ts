import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSectionComponent } from './menu-section.component';
import { ModalComponent, SearchBarComponent } from 'shared';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MenuSectionComponent', () => {
  let fixture: ComponentFixture<MenuSectionComponent>;
  let componentRef;
  let component: MenuSectionComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSectionComponent);
    componentRef = fixture.componentRef;

    componentRef.setInput('menus',
      [
        { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] },
        { id: 102, name: 'Menú Japonés', dishes: [{ id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'POPULAR', menuId: 102 }] }
      ]);
    
    componentRef.setInput('currentMenu',      
        { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] }     
      );
    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menus table', () => {
    const table = compiled.querySelector('lib-menu-board');
    expect(table).toBeTruthy();
  });

  it('should render menus modal', () => {
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

  it('should render menu form', () => {
    const form = compiled.querySelector('lib-menu-form');
    expect(form).toBeTruthy();
  });

  it('should call onSave when submit form', () => {
    spyOn(component.onSave, 'emit');
    const menu = { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] };
    const modalDebug: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
    const modalInstance = modalDebug.componentInstance as ModalComponent;
    const menuForm: DebugElement = fixture.debugElement.query(By.css('lib-menu-form'));
    
    menuForm.triggerEventHandler('onSubmit', menu);
    expect(component.onSave.emit).toHaveBeenCalledWith({menu: menu, modal: modalInstance});
  });

  it('should call onSelect when select a menu', () => {
    spyOn(component.onSelectToUpdate, 'emit');
    const menuBoard: DebugElement = fixture.debugElement.query(By.css('lib-menu-board'));

    menuBoard.triggerEventHandler('onSelectmenuToUpdate', 1);
    expect(component.onSelectToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call onDelete when submit to delete a menu', () => {
    spyOn(component.onDelete, 'emit');
    const clientBoard: DebugElement = fixture.debugElement.query(By.css('lib-delete-modal'));

    clientBoard.triggerEventHandler('onDelete', 1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should have menus in the input', () => {
    expect(2).toBe(component.menus().length);
  });

  it('should open create modal when action button is clicked', () => {
    spyOn(component, 'openCreateModal');
    
    const modal = fixture.debugElement.query(By.directive(ModalComponent));
    modal.triggerEventHandler('onOpenByBtn', null);
  
    expect(component.openCreateModal).toHaveBeenCalled();
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');
  
    const menuForm = fixture.debugElement.query(By.css('lib-menu-form'));
    menuForm.triggerEventHandler('onSubmit', { id: 3, name: 'Carlos Pérez', email: 'carlos@example.com', frequent: false });
  
    expect(component.handleSubmit).toHaveBeenCalled();
  });
  
  it('should update filtered clients when search is performed', () => {

    const searchBar = fixture.debugElement.query(By.directive(SearchBarComponent));
    const menu = { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] };
    searchBar.triggerEventHandler('onFilteredData', [menu]);
  
    expect(component.filteredmenus).toEqual([
      { id: 101, name: 'Menú Italiano', dishes: [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }] }
    ]);
  });

});
