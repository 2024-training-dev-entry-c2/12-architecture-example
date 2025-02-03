import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesSectionComponent } from './dishes-section.component';
import { DebugElement } from '@angular/core';
import { ModalComponent } from 'shared';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from '../../../../../../shared/src/public-api';

describe('DishesSectionComponent', () => {
  let fixture: ComponentFixture<DishesSectionComponent>;
  let componentRef;
  let component: DishesSectionComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesSectionComponent);
    componentRef = fixture.componentRef;

    componentRef.setInput('dishes',
      [
        { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 },
        { id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'POPULAR', menuId: 102 }
      ]);

    componentRef.setInput('currentDish',
        { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }
      );
    
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

  it('should render dishes table', () => {
    const table = compiled.querySelector('lib-dish-board');
    expect(table).toBeTruthy();
  });

  it('should render dishes modal', () => {
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

  it('should render dish form', () => {
    const form = compiled.querySelector('lib-dish-form');
    expect(form).toBeTruthy();
  });

  it('should call onSave when submit form', () => {
    spyOn(component.onSave, 'emit');
    const dish = { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 };
    const modalDebug: DebugElement = fixture.debugElement.query(By.directive(ModalComponent));
    const modalInstance = modalDebug.componentInstance as ModalComponent;
    const clientForm: DebugElement = fixture.debugElement.query(By.css('lib-dish-form'));
    
    clientForm.triggerEventHandler('onSubmit', dish);
    expect(component.onSave.emit).toHaveBeenCalledWith({dish: dish, modal: modalInstance});
  });

  it('should call onSelect when select a dish', () => {
    spyOn(component.onSelectToUpdate, 'emit');
    const dishBoard: DebugElement = fixture.debugElement.query(By.css('lib-dish-board'));

    dishBoard.triggerEventHandler('onSelectDishToUpdate', 1);
    expect(component.onSelectToUpdate.emit).toHaveBeenCalledWith(1);
  });

  it('should call onDelete when submit to delete a dish', () => {
    spyOn(component.onDelete, 'emit');
    const dishBoard: DebugElement = fixture.debugElement.query(By.css('lib-delete-modal'));

    dishBoard.triggerEventHandler('onDelete', 1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should have clients in the input', () => {
    expect(2).toBe(component.dishes().length);
  });

  it('should open create modal when action button is clicked', () => {
    spyOn(component, 'openCreateModal');
    
    const modal = fixture.debugElement.query(By.directive(ModalComponent));
    modal.triggerEventHandler('onOpenByBtn', null);
  
    expect(component.openCreateModal).toHaveBeenCalled();
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');
  
    const dishForm = fixture.debugElement.query(By.css('lib-dish-form'));
    dishForm.triggerEventHandler('onSubmit', { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 });
  
    expect(component.handleSubmit).toHaveBeenCalled();
  });
  
  it('should update filtered dishes when search is performed', () => {

    const searchBar = fixture.debugElement.query(By.css('lib-search-bar'));
    searchBar.triggerEventHandler('onFilteredData', [{ id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }]);
  
    expect(component.filteredDishes).toEqual([
      { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'NORMAL', menuId: 101 }
    ]);
  });
});
