import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chart } from 'chart.js/auto';
import { GraphDishComponent } from './graph-dish.component';
import { ThemeService } from 'shared';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('GraphDishComponent', () => {
  let component: GraphDishComponent;
  let fixture: ComponentFixture<GraphDishComponent>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;
  beforeEach(async () => {
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['themeState$']);
    themeServiceMock.themeState$ = of(false);

    await TestBed.configureTestingModule({
      imports: [GraphDishComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphDishComponent);
    component = fixture.componentInstance;
    component.menu = [
      {
        dishfoods: [
          { name: 'Pizza', orderList: [1, 2, 3, 4] },
          { name: 'Burger', orderList: [1, 2] },
          { name: 'Pasta', orderList: [1, 2, 3] },
        ],
      },
      {
        dishfoods: [
          { name: 'Pizza', orderList: [1, 2] },
          { name: 'Burger', orderList: [1, 2, 3, 4, 5] },
        ],
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should subscribe to theme changes', () => {
    expect(themeServiceMock.themeState$.subscribe).toBeDefined();
  });
  it('should correctly determine top 5 dishes', () => {
    component.getTop5Dish();
    fixture.detectChanges();

    expect(component.topDishes.length).toBe(3);
    expect(component.topDishes[0].name).toBe('Burger'); // Más ventas
    expect(component.topDishes[1].name).toBe('Pizza');
    expect(component.topDishes[2].name).toBe('Pasta');
  });


});
