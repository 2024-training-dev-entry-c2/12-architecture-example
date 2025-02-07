import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMenu, IMenuFormDto } from '../../../../domain/models/menu.model';
import { ListMenusComponent } from './list-menus.component';

@Component({
  selector: 'lib-modal',
  standalone: true,
  template: '',
})
class MockModalComponent {
  toggle() {}
}

@Component({
  selector: 'lib-menu-form',
  standalone: true,
  template: '',
})
class MockMenuFormComponent {}

describe('ListMenusComponent', () => {
  let component: ListMenusComponent;
  let fixture: ComponentFixture<ListMenusComponent>;

  const mockMenus: IMenu[] = [
    {
      menuId: 1,
      name: 'Menu 1',
      description: 'Description 1',
      dishes: [],
    },
    {
      menuId: 2,
      name: 'Menu 2',
      description: 'Description 2',
      dishes: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenusComponent, MockModalComponent, MockMenuFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListMenusComponent);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.menus as any) = signal(mockMenus);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Menu Submission', () => {
    it('should filter dishes based on dishIds', () => {
      const menuWithDishes: IMenu[] = [
        {
          menuId: 1,
          name: 'Menu 1',
          description: 'Description 1',
          dishes: [
            { id: 1, name: 'Dish 1', menuId: 1, price: 12000 },
            { id: 2, name: 'Dish 2', menuId: 1, price: 32000 },
            { id: 3, name: 'Dish 3', menuId: 1, price: 15000 },
          ],
        },
      ];

      TestBed.runInInjectionContext(() => {
        (component.menus as any) = signal(menuWithDishes);
      });

      const formData: IMenuFormDto = {
        menuId: 1,
        name: 'Updated Menu',
        description: 'Updated Description',
        dishIds: [1, 3], // Only want dishes 1 and 3
      };

      const createSpy = spyOn(component.onCreateMenu, 'emit');
      component.handleSubmit(formData);

      expect(createSpy).toHaveBeenCalledWith({
        menu: {
          menuId: formData.menuId,
          name: formData.name,
          description: formData.description,
          dishes: [
            { id: 1, name: 'Dish 1', menuId: 1, price: 12000 },
            { id: 3, name: 'Dish 3', menuId: 1, price: 15000 },
          ],
        },
        modal: component.modal(),
      });
    });
    it('should handle submit and emit created menu', () => {
      const formData: IMenuFormDto = {
        menuId: 3,
        name: 'New Menu',
        description: 'New Description',
        dishIds: [1, 4],
      };

      const createSpy = spyOn(component.onCreateMenu, 'emit');
      component.handleSubmit(formData);

      expect(createSpy).toHaveBeenCalledWith({
        menu: {
          menuId: formData.menuId,
          name: formData.name,
          description: formData.description,
          dishes: [],
        },
        modal: component.modal(),
      });
    });

    it('should handle submit with existing menu id', () => {
      const formData: IMenuFormDto = {
        menuId: mockMenus[0].menuId,
        name: 'Updated Menu',
        description: 'Updated Description',
        dishIds: [],
      };

      const createSpy = spyOn(component.onCreateMenu, 'emit');
      component.handleSubmit(formData);

      expect(createSpy).toHaveBeenCalledWith({
        menu: {
          menuId: formData.menuId,
          name: formData.name,
          description: formData.description,
          dishes: [],
        },
        modal: component.modal(),
      });
    });
  });

  describe('Menu Selection', () => {
    it('should emit selected menu id and toggle modal', () => {
      const selectSpy = spyOn(component.onSelectMenu, 'emit');
      const modalSpy = spyOn(component.modal(), 'toggle');

      component.selectMenu(1);

      expect(selectSpy).toHaveBeenCalledWith(1);
      expect(modalSpy).toHaveBeenCalled();
    });
  });

  describe('Menu Deletion', () => {
    it('should set menu to delete and toggle modal', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      const menuToDelete = mockMenus[0];

      component.handleDeleteClick(menuToDelete);

      expect(component.menuToDelete).toBe(menuToDelete);
      expect(modalSpy).toHaveBeenCalled();
    });

    it('should emit delete event and clear menuToDelete on confirm', () => {
      const deleteSpy = spyOn(component.onDeleteMenu, 'emit');
      const menu = mockMenus[0];

      component.menuToDelete = menu;
      component.handleConfirmDelete();

      expect(deleteSpy).toHaveBeenCalledWith({
        menuId: menu.menuId,
        modal: component.deleteModal(),
      });
      expect(component.menuToDelete).toBeNull();
    });

    it('should not emit delete event if menuToDelete is null', () => {
      const deleteSpy = spyOn(component.onDeleteMenu, 'emit');
      component.menuToDelete = null;

      component.handleConfirmDelete();

      expect(deleteSpy).not.toHaveBeenCalled();
    });

    it('should clear menuToDelete and toggle modal on cancel', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      component.menuToDelete = mockMenus[0];

      component.handleCancelDelete();

      expect(modalSpy).toHaveBeenCalled();
      expect(component.menuToDelete).toBeNull();
    });
  });
});
