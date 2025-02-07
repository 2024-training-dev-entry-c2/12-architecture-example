import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDishesComponent } from './list-dishes.component';
import { ModalComponent } from 'shared';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';
import { Component } from '@angular/core';
import { IDish } from '../../../../domain/model/dish.model';
import { signal } from '@angular/core';

@Component({
  selector: 'lib-modal',
  standalone: true,
  template: '',
})
class MockModalComponent {
  toggle() {}
}

@Component({
  selector: 'lib-dish-form',
  standalone: true,
  template: '',
})
class MockDishFormComponent {}

describe('ListDishesComponent', () => {
  let component: ListDishesComponent;
  let fixture: ComponentFixture<ListDishesComponent>;

  const mockDishes: IDish[] = [
    { id: 1, name: 'Pizza', price: 10, menuId: 1 },
    { id: 2, name: 'Burger', price: 8, menuId: 1 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDishesComponent, MockModalComponent, MockDishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDishesComponent);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.dishes as any) = signal(mockDishes);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should render dishes table', () => {
      const table = fixture.nativeElement.querySelector('.dishes-table');
      expect(table).toBeTruthy();
    });

    it('should render all dishes', () => {
      const rows = fixture.nativeElement.querySelectorAll(
        '.dishes-table__body .dishes-table__row'
      );
      expect(rows.length).toBe(mockDishes.length);
    });
  });

  describe('Create/Edit Modal', () => {
    it('should open modal for new dish', () => {
      const modal = component.modal();
      const spy = spyOn(modal, 'toggle');

      const createButton = fixture.nativeElement.querySelector(
        'lib-modal[action="Crear Plato"]'
      );
      createButton.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit dish creation event', () => {
      const newDish: IDish = { id: 3, name: 'Pasta', price: 12, menuId: 1 };
      const createSpy = spyOn(component.onCreateDish, 'emit');

      component.handleSubmit(newDish);

      expect(createSpy).toHaveBeenCalledWith({
        dish: newDish,
        modal: component.modal(),
      });
    });
  });

  describe('Delete Modal', () => {
    it('should open delete modal', () => {
      const deleteModal = component.deleteModal();
      const spy = spyOn(deleteModal, 'toggle');

      component.handleDeleteClick(mockDishes[0]);

      expect(spy).toHaveBeenCalled();
      expect(component.dishToDelete).toBe(mockDishes[0]);
    });

    it('should emit delete event on confirm', () => {
      const deleteSpy = spyOn(component.onDeleteDish, 'emit');
      component.dishToDelete = mockDishes[0];

      component.handleConfirmDelete();

      expect(deleteSpy).toHaveBeenCalledWith({
        dishId: mockDishes[0].id,
        modal: component.deleteModal(),
      });
      expect(component.dishToDelete).toBeNull();
    });

    it('should clear dishToDelete on cancel', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      component.dishToDelete = mockDishes[0];

      component.handleCancelDelete();

      expect(modalSpy).toHaveBeenCalled();
      expect(component.dishToDelete).toBeNull();
    });
  });

  describe('Dish Selection', () => {
    it('should emit selected dish id and open modal', () => {
      const selectSpy = spyOn(component.onSelectDish, 'emit');
      const modalSpy = spyOn(component.modal(), 'toggle');

      component.selectDish(1);

      expect(selectSpy).toHaveBeenCalledWith(1);
      expect(modalSpy).toHaveBeenCalled();
    });
  });
});
