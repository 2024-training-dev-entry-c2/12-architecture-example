import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDishFormComponent } from './update-dish-form.component';
import { IDish } from 'dishes';

describe('UpdateDishFormComponent', () => {
  let component: UpdateDishFormComponent;
  let fixture: ComponentFixture<UpdateDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDishFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('getData', []);
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the value of the form', () => {
    fixture.detectChanges();
    const dishObject: IDish = {
      id: 1,
      name: 'Pizza',
      price: 10.0,
      isPopular: false,
      menu: 'menu',
      orderList: [1, 2, 3],
    };
    spyOn(component, 'getData').and.returnValue(dishObject);
    component.ngOnInit(); 
    fixture.detectChanges();
    expect(component.dishfoodUpdatedForm.get('id')?.value).toEqual(1);
    expect(component.dishfoodUpdatedForm.get('name')?.value).toEqual('Pizza');
    expect(component.dishfoodUpdatedForm.get('price')?.value).toEqual(10.0);
    expect(component.dishfoodUpdatedForm.get('isPopular')?.value).toEqual(false);
    expect(component.dishfoodUpdatedForm.get('menu')?.value).toEqual('menu');
    expect(component.dishfoodUpdatedForm.get('orderList')?.value).toEqual([1, 2, 3]);
  });
  it('should emit closeModal event when redirectToMenu is called', () => {
    spyOn(component.closeModal, 'emit');

    component.redirectToMenu();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should not emit updateDish if form is invalid', () => {
    spyOn(component.updateDish, 'emit');

    component.dishfoodUpdatedForm.setValue({
      id: null,
      name: '', // Nombre vacío, invalida el formulario
      price: 12.0,
      isPopular: false,
      menu: 'Fast Food',
      orderList: [],
    });

    component.sendToUpdate();

    expect(component.updateDish.emit).not.toHaveBeenCalled();
  });
});
