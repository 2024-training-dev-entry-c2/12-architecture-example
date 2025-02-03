import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPageComponent } from './menu-page.component';
import { ModalComponent } from 'shared';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { IMenu } from '../../../../domain/model/menu.model';
import { signal } from '@angular/core';

describe('MenuPageComponent', () => {
  let fixture: ComponentFixture<MenuPageComponent>;
  let component: MenuPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPageComponent, ModalComponent, MenuFormComponent], // Importando en lugar de declarar
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
  });

  it('should handle menu selection and toggle modal', () => {
    // Mock del modal
    const mockModal = jasmine.createSpyObj('modal', ['toggle']);
    component.modal = mockModal; // Aseguramos que el modal sea un spy
  
    spyOn(component.onSelectMenu, 'emit'); // Espiamos el evento
  
    const menuId = 1;
    component.selectMenu(menuId); // Llamada a la función
  
    // Verificaciones
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

  it('should not toggle modal if modal is null when selecting a menu', () => {
    // Simulamos que el modal es null
    component.modal = null;
  
    // Verificamos que no se lance una excepción al llamar a selectMenu
    expect(() => component.selectMenu(1)).not.toThrow();
  });

  it('should render the title and description correctly', () => {
    fixture.detectChanges();
  
    const titleElement = fixture.nativeElement.querySelector('.menu__title');
    const descriptionElement = fixture.nativeElement.querySelector('.menu__description');
  
    expect(titleElement.textContent).toContain('Menús Disponibles');
    expect(descriptionElement.textContent).toContain('Descubre nuestros menús y los deliciosos platillos que los componen.');
  });

  it('should render the modal with the correct current menu', () => {
    const mockMenu: IMenu = { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10, description: 'Description 1' }] };

    fixture.componentRef.setInput('currentMenu', mockMenu);
    fixture.detectChanges();

    component.modal = { toggle: jasmine.createSpy('toggle') } as any;
    component.modal.toggle();
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('lib-modal');
    expect(modal).toBeTruthy();

    const menuForm = modal.querySelector('lib-menu-form');
    expect(menuForm).toBeTruthy();

    const menuAttribute = menuForm.getAttribute('ng-reflect-menu');
    expect(menuAttribute).toEqual('[object Object]');
  });

  it('should emit onCreateMenu with correct data when handleSubmit is called', () => {
    const mockMenu: IMenu = { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10, description: 'Description 1' }] };
    component.modal = { toggle: jasmine.createSpy('toggle') } as any; // Configuramos el mock del modal
    spyOn(component.onCreateMenu, 'emit');

    component.handleSubmit(mockMenu);

    expect(component.onCreateMenu.emit).toHaveBeenCalledWith({
      menu: mockMenu,
      modal: component.modal,
    });
    expect(component.modal.toggle).toHaveBeenCalled();
  });

  it('should not toggle modal if modal is null when selecting a menu', () => {
    component.modal = null;
    expect(() => component.selectMenu(1)).not.toThrow();
  });

  it('should emit onSelectMenu with correct id when selectMenu is called', () => {
    spyOn(component.onSelectMenu, 'emit');

    component.selectMenu(1);

    expect(component.onSelectMenu.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onDelete with correct id when deleteMenu is called', () => {
    spyOn(component.onDelete, 'emit');

    component.deleteMenu(1);

    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should not emit onCreateMenu if menu is null when handleSubmit is called', () => {
    component.modal = { toggle: jasmine.createSpy('toggle') } as any; // Configuramos el mock del modal
    spyOn(component.onCreateMenu, 'emit');

    component.handleSubmit(null);

    expect(component.onCreateMenu.emit).not.toHaveBeenCalled();
    expect(component.modal.toggle).not.toHaveBeenCalled();
  });

  it('should not emit onSelectMenu if id is null when selectMenu is called', () => {
    component.modal = { toggle: jasmine.createSpy('toggle') } as any; // Configuramos el mock del modal
    spyOn(component.onSelectMenu, 'emit');

    component.selectMenu(null);

    expect(component.onSelectMenu.emit).not.toHaveBeenCalled();
    expect(component.modal.toggle).not.toHaveBeenCalled();
  });

  it('should emit onDelete with correct id when deleteMenu is called', () => {
    spyOn(component.onDelete, 'emit');

    component.deleteMenu(1);

    expect(component.onDelete.emit).toHaveBeenCalledWith(1);
  });

  it('should not toggle modal if modal is null when handleSubmit is called', () => {
    component.modal = null;
    spyOn(component.onCreateMenu, 'emit');
  
    const mockMenu: IMenu = { id: 1, name: 'Menu 1', dishes: [{ name: 'Dish 1', price: 10, description: 'Description 1' }] };
    component.handleSubmit(mockMenu);
  
    expect(component.onCreateMenu.emit).not.toHaveBeenCalled();
  });
  
  it('should not emit onDelete if id is null when deleteMenu is called', () => {
    spyOn(component.onDelete, 'emit');
  
    component.deleteMenu(null);
  
    expect(component.onDelete.emit).not.toHaveBeenCalled();
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

  it('should emit onSelectMenu and toggle modal when selectMenu is called with undefined and modal exists', () => {
    const modalSpy = jasmine.createSpyObj('modal', ['toggle']);
    component.modal = modalSpy;
    spyOn(component.onSelectMenu, 'emit');
  
    component.selectMenu(undefined);
  
    expect(component.onSelectMenu.emit).toHaveBeenCalledWith(undefined);
    expect(modalSpy.toggle).toHaveBeenCalled();
  });
  
  it('should not emit onCreateMenu and not toggle modal when handleSubmit is called with undefined', () => {
    // Aunque modal exista, al pasar undefined en menu, la condición (menu && this.modal) es falsa
    component.modal = { toggle: jasmine.createSpy('toggle') } as any;
    spyOn(component.onCreateMenu, 'emit');
  
    component.handleSubmit(undefined);
  
    expect(component.onCreateMenu.emit).not.toHaveBeenCalled();
    expect(component.modal.toggle).not.toHaveBeenCalled();
  });
  
  it('should emit onDelete when deleteMenu is called with undefined', () => {
    // Dado que undefined !== null, se debe emitir el evento con undefined
    spyOn(component.onDelete, 'emit');
  
    component.deleteMenu(undefined);
  
    expect(component.onDelete.emit).toHaveBeenCalledWith(undefined);
  });
});