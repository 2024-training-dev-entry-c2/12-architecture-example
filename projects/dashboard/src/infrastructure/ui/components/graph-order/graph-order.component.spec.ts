import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOrderComponent } from './graph-order.component';
import { ThemeService } from 'shared';
import { of } from 'rxjs';

describe('GraphOrderComponent', () => {
  let component: GraphOrderComponent;
  let fixture: ComponentFixture<GraphOrderComponent>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['themeState$']);
    themeServiceMock.themeState$ = of(false);
    await TestBed.configureTestingModule({
      imports: [GraphOrderComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphOrderComponent);
    component = fixture.componentInstance;
    component.ordersPerMonth = [
      { month: '2025-01', totalOrder: 15 },
      { month: '2025-02', totalOrder: 25 },
      { month: '2025-03', totalOrder: 35 },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should subscribe to theme changes', () => {
    expect(themeServiceMock.themeState$.subscribe).toBeDefined();
  });
  it('should correctly calculate orders per month', () => {
    component.getOrdersPerWeekOfMonth([
      { localDate: '2025-01-15' },
      { localDate: '2025-01-20' },
      { localDate: '2025-02-12' },
      { localDate: '2025-02-25' },
      { localDate: '2025-03-10' },
    ]);
    fixture.detectChanges();

    expect(component.ordersPerMonth.length).toBe(3);
    expect(component.ordersPerMonth[0].month).toBe('2025-1');
    expect(component.ordersPerMonth[0].totalOrder).toBe(2);
    expect(component.ordersPerMonth[1].month).toBe('2025-2');
    expect(component.ordersPerMonth[1].totalOrder).toBe(2);
  });
  

});
