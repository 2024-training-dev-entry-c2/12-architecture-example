import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'shared';
import { IDish } from '../../../../domain/model/dish.model';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';

describe('DishFormComponent', () => {
  let component: DishFormComponent;
  let fixture: ComponentFixture<DishFormComponent>;

  const mockDish: IDish = {
    id: 1,
    name: 'Pizza',
    price: 10,
    menuId: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishFormComponent, ReactiveFormsModule, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize with empty form', () => {
      expect(component.form.get('name')?.value).toBe('');
      expect(component.form.get('price')?.value).toBe(0);
    });

    it('should initialize with dish data in edit mode', () => {
      component.dish = mockDish;
      // component.ngOnInit(); //!Dish form no maneja el ciclo de vida de Angular

      expect(component.form.get('name')?.value).toBe(mockDish.name);
      expect(component.form.get('price')?.value).toBe(mockDish.price);
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when empty', () => {
      expect(component.form.valid).toBeFalsy();
    });

    it('should be invalid with negative price', () => {
      component.form.patchValue({
        name: 'Test Dish',
        price: -10,
      });

      expect(component.form.get('price')?.valid).toBeFalsy();
    });

    it('should be valid with correct data', () => {
      component.form.patchValue({
        name: 'Test Dish',
        price: 10,
        menuId: 1,
      });

      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('Form Submission', () => {
    it('should emit form data on valid submit', () => {
      const submitSpy = spyOn(component.onSubmit, 'emit');
      component.form.patchValue({
        id: 3,
        name: 'Muffin de crema',
        price: 15000,
        menuId: 1,
      });

      component.submit();

      expect(submitSpy).toHaveBeenCalledWith({
        id: 3,
        name: 'Muffin de crema',
        price: 15000,
        menuId: 1,
      });
    });

    it('should not emit if form is invalid', () => {
      const submitSpy = spyOn(component.onSubmit, 'emit');
      component.form.patchValue({
        name: '',
        price: -1,
      });

      component.submit();

      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  // describe('Form Cancel', () => {
  //   it('should emit cancel event', () => {
  //     const cancelSpy = spyOn(component.onCancel, 'emit');

  //     component.handleCancel();

  //     expect(cancelSpy).toHaveBeenCalled();
  //   });
  // }); //! cancel method no esta implementado

  // describe('Price Input Validation', () => {
  //   it('should format price on blur', () => {
  //     const priceControl = component.form.get('price');
  //     priceControl?.setValue(10.999);

  //     component.onPriceBlur();

  //     expect(priceControl?.value).toBe(11);
  //   });
});
