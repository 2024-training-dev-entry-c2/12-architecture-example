import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDishComponent } from './table-dish.component';
import { IMenu } from 'menus';
import { IDish } from 'dishes';

describe('TableDishComponent', () => {
  let component: TableDishComponent;
  let fixture: ComponentFixture<TableDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDishComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDishComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('menu', [
      { id: 1, name: 'Menu 1' },
      { id: 2, name: 'Menu 2' },
    ] as IMenu[]);

    fixture.componentRef.setInput('dishes', [
      {
        id: 1,
        name: 'Dish 1',
        price: 10.0,
        isPopular: false,
        menu: 'Menu 1',
        orderList: [1, 2, 3],
      },
      {
        id: 2,
        name: 'Dish 2',
        menu: 'Menu 2',
        isPopular: false,
        price: 10.0,
        orderList: [1, 2, 3],
      },
    ] as IDish[]);

    fixture.componentRef.setInput('item', { id: 1, name: 'Menu 1' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filter dishes correctly based on menu selection', () => {
    const filteredDishes = component.getMenuDishes();
    expect(filteredDishes.length).toBe(1);
    expect(filteredDishes[0].name).toBe('Dish 1');
  });
  it('should open create dish modal', () => {
    component.redirectToDish();
    expect(component.showModal).toBeTrue();
  });
  it('should call deleteDish and emit the event', () => {
    spyOn(component.deleteDishfood, 'emit');
    component.deleteDish(1);
    expect(component.deleteDishfood.emit).toHaveBeenCalledWith(1);
  });

  it('should open update dish modal and set dishId', () => {
    component.redirectToDishUpdate(2);
    expect(component.showModalUpdate).toBeTrue();
    expect(component.dishId).toBe(2);
  });
  it('should emit createDish event with correct menuId', () => {
    spyOn(component.createDishData, 'emit');
    const newDish = { name: 'New Dish' } as any;
    component.createDish(newDish);
    expect(newDish.menuId).toBe(1);
    expect(component.createDishData.emit).toHaveBeenCalledWith(newDish);
  });

  it('should emit updateDish event with correct menuId', () => {
    spyOn(component.updateDish, 'emit');
    const updatedDish = { name: 'Updated Dish' } as any;
    component.dishId = 2;
    component.handleUpdateDish(updatedDish);
    expect(updatedDish.menuId).toBe(1);
    expect(component.updateDish.emit).toHaveBeenCalledWith({
      dish: updatedDish,
      id: 2,
    });
  });
});
