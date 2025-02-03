import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DishPageComponent } from './dish-page.component';
import { ModalComponent } from 'shared';
import { DishFormComponent } from '../../forms/dish-form/dish-form.component';
import { IDish, IMenu } from '../../../../domain/model/dish.model';

describe('DishPageComponent', () => {
  let fixture: ComponentFixture<DishPageComponent>;
  let component: DishPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishPageComponent, ModalComponent, DishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishPageComponent);
    component = fixture.componentInstance;
  });

  it('should emit onCreateDish and toggle modal when handleSubmit is called', () => {
    // Creamos un fakeModal con las propiedades requeridas por ModalComponent.
    const fakeModal: ModalComponent = {
      toggle: jasmine.createSpy('toggle'),
      acton: 'dummy',
      visiblets: false
    } as any;
    // Asignamos el modal como un signal que retorna el fakeModal.
    component.modal = signal(fakeModal) as any;

    spyOn(component.onCreateDish, 'emit');

    const testDish: IDish = { 
      id: 1, 
      name: 'Dish 1', 
      description: 'Desc 1', 
      price: 10, 
      menu: { id: 1, name: 'Menu 1' } 
    };
    component.handleSubmit(testDish);

    expect(component.onCreateDish.emit).toHaveBeenCalledWith({ dish: testDish, modal: fakeModal });
    expect(fakeModal.toggle).toHaveBeenCalled();
  });

  it('should emit onSelectDish and toggle modal when selectDish is called', () => {
    const fakeModal: ModalComponent = {
      toggle: jasmine.createSpy('toggle'),
      acton: 'dummy',
      visiblets: false
    } as any;
    component.modal = signal(fakeModal) as any;
    spyOn(component.onSelectDish, 'emit');

    const dishId = 1;
    component.selectDish(dishId);

    expect(component.onSelectDish.emit).toHaveBeenCalledWith(dishId);
    expect(fakeModal.toggle).toHaveBeenCalled();
  });

  it('should emit onDelete when deleteDish is called', () => {
    spyOn(component.onDelete, 'emit');

    const dishId = 1;
    component.deleteDish(dishId);

    expect(component.onDelete.emit).toHaveBeenCalledWith(dishId);
  });

  it('should render title and description correctly', () => {
    // Se proveen inputs seguros para evitar que se intente iterar sobre undefined
    fixture.componentRef.setInput('dishes', []);       // Vacío para que no falle el *for
    fixture.componentRef.setInput('menus', []);         // Por si el template lo usa
    fixture.componentRef.setInput('currentDish', null); // Valor seguro
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dish__title').textContent).toContain('Listado de Platos');
    expect(compiled.querySelector('.dish__description').textContent).toContain('Aquí puedes ver todos los platos disponibles en el menú.');
  });

  it('should render dish cards with correct details', () => {
    const testDishes: IDish[] = [
      { id: 1, name: 'Dish 1', description: 'Desc 1', price: 10, menu: { id: 1, name: 'Menu 1' } },
      { id: 2, name: 'Dish 2', description: 'Desc 2', price: 20, menu: { id: 2, name: 'Menu 2' } },
    ];
    // Se setean los inputs necesarios para que el template no intente iterar sobre undefined
    fixture.componentRef.setInput('dishes', testDishes);
    fixture.componentRef.setInput('menus', []);      // Si el template usa menus() en algún lugar
    fixture.componentRef.setInput('currentDish', null); // O cualquier valor seguro
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement;
    const dishCards = compiled.querySelectorAll('.dish-card');
    expect(dishCards.length).toBe(2);
  
    const firstCard = dishCards[0];
    expect(firstCard.querySelector('.dish-card__menu').textContent).toContain('Menu 1');
    expect(firstCard.querySelector('.dish-card__title').textContent).toContain('Dish 1');
    expect(firstCard.querySelector('.dish-card__description').textContent).toContain('Desc 1');
    expect(firstCard.querySelector('.dish-card__price').textContent).toContain('$');
  });

  it('should render the dish form inside the modal with proper bindings', () => {
    // Configuramos los inputs para currentDish y menus.
    const testDish: IDish = { id: 1, name: 'Dish 1', description: 'Desc 1', price: 10, menu: { id: 1, name: 'Menu 1' } };
    const testMenus: IMenu[] = [
      { id: 1, name: 'Menu 1' },
      { id: 2, name: 'Menu 2' },
    ];
    fixture.componentRef.setInput('currentDish', testDish);
    fixture.componentRef.setInput('menus', testMenus);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const modalElement = compiled.querySelector('lib-modal');
    expect(modalElement).toBeTruthy();

    const dishForm = modalElement.querySelector('lib-dish-form');
    expect(dishForm).toBeTruthy();
    // Se verifica que se hayan establecido las propiedades (la representación puede ser [object Object]).
    expect(dishForm.getAttribute('ng-reflect-dish')).toBeTruthy();
    expect(dishForm.getAttribute('ng-reflect-menus')).toBeTruthy();
  });
});
