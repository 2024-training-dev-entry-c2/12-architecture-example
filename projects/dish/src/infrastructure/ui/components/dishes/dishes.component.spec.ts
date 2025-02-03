import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DishesComponent } from './dishes.component';
import { By } from '@angular/platform-browser';
import { IDishResponse } from '../../../../domain/model/dish.model';
import { IMenuResponse } from 'menu';

describe('DishesComponent', () => {
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;

  const mockMenus: IMenuResponse[] = [
    {
      id: 1,
      menuName: 'Desayuno',
      description: 'Comidas de primera entrega',
      active: true,
    },
    {
      id: 2,
      menuName: 'Almuerzo',
      description: 'Comidas de segunda entrega',
      active: true,
    },
  ];

  const mockDishes: IDishResponse[][] = [
    [
      {
        id: 101,
        dishName: 'Huevos revueltos',
        description: 'Con pan',
        basePrice: 5000,
        isPopular: true,
        active: true,
      },
      {
        id: 102,
        dishName: 'Arepa',
        description: 'Con queso',
        basePrice: 4000,
        isPopular: false,
        active: true,
      },
    ],
    [
      {
        id: 201,
        dishName: 'Bandeja paisa',
        description: 'Grande',
        basePrice: 15000,
        isPopular: true,
        active: true,
      },
    ],
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    component.menus$ = of(mockMenus);
    component.dishes$ = of(mockDishes);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Platos"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1').textContent).toContain('Platos');
  });

  it('should render menus and dishes in the table', () => {
    fixture.detectChanges();
    const tables = fixture.debugElement.queryAll(By.css('table'));
    expect(tables.length).toBe(2);

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });
});
