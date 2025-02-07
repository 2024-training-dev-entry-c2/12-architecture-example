import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IMenu } from '../../../../domain/models/menu.model';
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

  describe('Menu List Rendering', () => {
    it('should render all menus', () => {
      const rows = fixture.nativeElement.querySelectorAll('.menus-table__row');
      // Add 1 for header row
      expect(rows.length).toBe(mockMenus.length + 1);
    });

    it('should display menu information', () => {
      const firstRow = fixture.nativeElement.querySelector(
        '.menus-table__body .menus-table__row'
      );
      const cells = firstRow.querySelectorAll('.menus-table__cell');

      expect(cells[0].textContent).toContain(mockMenus[0].name);
      expect(cells[1].textContent).toContain(mockMenus[0].description);
      expect(cells[2].textContent).toContain('0'); // dishes length
    });
  });

  describe('Menu Selection', () => {
    it('should emit selected menu id and open modal', () => {
      const selectSpy = spyOn(component.onSelectMenu, 'emit');
      const modalSpy = spyOn(component.modal(), 'toggle');

      component.selectMenu(1);

      expect(selectSpy).toHaveBeenCalledWith(1);
      expect(modalSpy).toHaveBeenCalled();
    });
  });

  describe('Menu Creation/Edit', () => {
    it('should handle form submission for new menu', () => {
      const createSpy = spyOn(component.onCreateMenu, 'emit');
      const formData = {
        menuId: 3,
        name: 'New Menu',
        description: 'New Description',
        dishIds: [],
      };

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

    it('should handle form submission for existing menu', () => {
      const createSpy = spyOn(component.onCreateMenu, 'emit');
      const formData = {
        menuId: mockMenus[0].menuId,
        name: 'Updated Menu',
        description: 'Updated Description',
        dishIds: [],
      };

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

  describe('Menu Deletion', () => {
    it('should open delete modal with selected menu', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      const menu = mockMenus[0];

      component.handleDeleteClick(menu);

      expect(component.menuToDelete).toBe(menu);
      expect(modalSpy).toHaveBeenCalled();
    });

    it('should emit delete event on confirm', () => {
      const deleteSpy = spyOn(component.onDeleteMenu, 'emit');
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      const menu = mockMenus[0];

      component.menuToDelete = menu;
      component.handleConfirmDelete();

      expect(deleteSpy).toHaveBeenCalledWith({
        menuId: menu.menuId,
        modal: component.deleteModal(),
      });
      expect(component.menuToDelete).toBeNull();
    });

    it('should close modal and clear selection on cancel', () => {
      const modalSpy = spyOn(component.deleteModal(), 'toggle');
      component.menuToDelete = mockMenus[0];

      component.handleCancelDelete();

      expect(modalSpy).toHaveBeenCalled();
      expect(component.menuToDelete).toBeNull();
    });
  });
});
