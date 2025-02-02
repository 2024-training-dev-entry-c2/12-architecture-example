import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishFormComponent } from './create-dish-form.component';


describe('CreateDishFormComponent', () => {
  let component: CreateDishFormComponent;
  let fixture: ComponentFixture<CreateDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoud initilize from with default values',()=>{
    expect(component.dishfoodUpdatedForm.get('name').value).toBe('');
    expect(component.dishfoodUpdatedForm.get('price').value).toBe(10.0);    
    expect(component.dishfoodUpdatedForm.get('isPopular').value).toBe(false);
    expect(component.dishfoodUpdatedForm.get('menuId').value).toBe(0);
  })

  it('should redirect to dish', () => {
    const spy = spyOn(component.closeModal, 'emit');
    component.redirectToDish();
    expect(spy).toHaveBeenCalled();
  });

  it('should add dish', () => {
    const spy = spyOn(component.updateDish, 'emit');
    component.dishfoodUpdatedForm.get('name').setValue('Pizza');
    component.dishfoodUpdatedForm.get('price').setValue(10.0);
    component.dishfoodUpdatedForm.get('isPopular').setValue(false);
    component.dishfoodUpdatedForm.get('menuId').setValue(0);
    component.addDish();
    expect(spy).toHaveBeenCalled();
  });
  it('should reset the form after addDish()', () => {
    component.dishfoodUpdatedForm.get('name').setValue('Pizza');
    component.dishfoodUpdatedForm.get('price').setValue(10.0);
    component.dishfoodUpdatedForm.get('isPopular').setValue(false);
    component.dishfoodUpdatedForm.get('menuId').setValue(0);
    component.addDish();
    expect(component.dishfoodUpdatedForm.get('name').value).toBe(null);
    expect(component.dishfoodUpdatedForm.get('price').value).toBe(null);
    expect(component.dishfoodUpdatedForm.get('isPopular').value).toBe(null);        
    expect(component.dishfoodUpdatedForm.get('menuId').value).toBe(null);      
  })
  it('should call addDish() when button is clicked', () => {
    const spy = spyOn(component, 'addDish');
    component.dishfoodUpdatedForm.get('name').setValue('Pizza');
    component.dishfoodUpdatedForm.get('price').setValue(10.0);
    component.dishfoodUpdatedForm.get('isPopular').setValue(false);
    component.dishfoodUpdatedForm.get('menuId').setValue(0);
    component.addDish();
    expect(spy).toHaveBeenCalled();
  });   

});
