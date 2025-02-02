import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishOrderListComponent } from './dish-order-list.component';

describe('DishOrderListComponent', () => {
  let fixture: ComponentFixture<DishOrderListComponent>;
  let componentRef;
  let component: DishOrderListComponent;
  let compiled : HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishOrderListComponent);
    componentRef = fixture.componentRef;

    componentRef.setInput('dishes',
      [
        { dishId: 1, dishName: 'Pasta Alfredo', price: 25000, quantity: 2 },
        { dishId: 2, dishName: 'Sushi Roll', price: 30000, quantity: 1 }
      ]);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dish names and prices correctly', () => {
    const dishItems = compiled.querySelectorAll('.dish-order-list__item');
    expect(dishItems.length).toBe(2);
    expect(dishItems[0].textContent).toContain('Pasta Alfredo');
    expect(dishItems[0].textContent).toContain('COP25,000.00');
    expect(dishItems[0].textContent).toContain('× 2');
    
    expect(dishItems[1].textContent).toContain('Sushi Roll');
    expect(dishItems[1].textContent).toContain('COP30,000.00');
    expect(dishItems[1].textContent).toContain('× 1');
  });
});
