import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPageComponent } from './menu-page.component';
import { ModalComponent } from 'shared';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { IMenu } from '../../../../domain/model/menu.model';

describe('MenuPageComponent', () => {
  let fixture: ComponentFixture<MenuPageComponent>;
  let component: MenuPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPageComponent, ModalComponent, MenuFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
  });

  it('should handle form submission and toggle modal', () => {
    const mockMenu: IMenu = { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10, description: 'Description 1' }] };
    const mockModal = jasmine.createSpyObj('ModalComponent', ['toggle']);
    component.modal = mockModal;

    spyOn(component.onCreateMenu, 'emit');
    
    component.handleSubmit(mockMenu);

    expect(component.onCreateMenu.emit).toHaveBeenCalledWith({ menu: mockMenu, modal: mockModal });
    expect(mockModal.toggle).toHaveBeenCalled();
  });

  it('should handle menu selection and toggle modal', () => {
    const mockModal = jasmine.createSpyObj('ModalComponent', ['toggle']);
    component.modal = mockModal;
    spyOn(component.onSelectMenu, 'emit');
    
    const menuId = 1;
    component.selectMenu(menuId);

    expect(component.onSelectMenu.emit).toHaveBeenCalledWith(menuId);
    expect(mockModal.toggle).toHaveBeenCalled();
  });

  it('should handle menu deletion', () => {
    spyOn(component.onDelete, 'emit');
    
    const menuId = 1;
    component.deleteMenu(menuId);

    expect(component.onDelete.emit).toHaveBeenCalledWith(menuId);
  });

  it('should render menus with dishes', () => {
    fixture.componentRef.setInput('menus', [
      { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10 }] },
    ]);
    fixture.detectChanges();

    const menuTitle = fixture.nativeElement.querySelector('.menu-card__title');
    const dishTitle = fixture.nativeElement.querySelector('.dish__title');

    expect(menuTitle.textContent).toContain('Menu 1');
    expect(dishTitle.textContent).toContain('Dish 1');
  });

  it('should display "Sin platillos asociados" if no dishes are present', () => {
    fixture.componentRef.setInput('menus', [
      { id: 1, name: 'Menu 1', dishes: [] },
    ]);
    fixture.detectChanges();

    const subtitleElement = fixture.nativeElement.querySelector('.menu-card__subtitle');
    expect(subtitleElement.textContent).toContain('Sin platillos asociados');
  });

  it('should render a list of menus correctly', () => {
    fixture.componentRef.setInput('menus', [
      { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10 }] },
      { id: 2, name: 'Menu 2', dishes: [] },
    ]);
    fixture.detectChanges();

    const menuCards = fixture.nativeElement.querySelectorAll('.menu-card');
    expect(menuCards.length).toBe(2);
  });

  it('should not display dish list if no dishes are available', () => {
    fixture.componentRef.setInput('menus', [
      { id: 1, name: 'Menu 1', dishes: [] },
    ]);
    fixture.detectChanges();

    const dishListElement = fixture.nativeElement.querySelector('.menu-card__dish-list');
    expect(dishListElement).toBeNull();
  });
});
