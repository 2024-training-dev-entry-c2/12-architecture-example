import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesListComponent } from './dishes-list.component';

describe('DishesListComponent', () => {
  let fixture: ComponentFixture<DishesListComponent>;
  let componentRef;
  let component: DishesListComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesListComponent);
    componentRef = fixture.componentRef;

    componentRef.setInput('dishes',
      [
        { id: 1, name: 'Pasta Alfredo', description: 'Pasta en salsa cremosa.', price: 25000, state: 'Disponible', menuId: 101 },
        { id: 2, name: 'Sushi Roll', description: 'Salmón, aguacate y queso crema.', price: 30000, state: 'Agotado', menuId: 102 }
      ]);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dish names and prices correctly', () => {
    const dishItems = compiled.querySelectorAll('.dish-list__item');
    expect(dishItems.length).toBe(2);
    expect(dishItems[0].textContent).toContain('Pasta Alfredo');
    expect(dishItems[0].textContent).toContain('COP25,000.00');
    
    expect(dishItems[1].textContent).toContain('Sushi Roll');
    expect(dishItems[1].textContent).toContain('COP30,000.00');
  });
});
