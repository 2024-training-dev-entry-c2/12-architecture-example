import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import { By } from '@angular/platform-browser';
import { MenusCardsComponent } from '../menus-cards/menus-cards.component';
import { GraphOrderComponent } from '../graph-order/graph-order.component';
import { GraphDishComponent } from '../graph-dish/graph-dish.component';
import { TableClientComponent } from '../table-client/table-client.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log menus on init', () => {
    const spy = spyOn(console, 'log');
    component.menus = [{ name: 'Dish 1' }, { name: 'Dish 2' }];
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(component.menus);
  });
  it('should pass menus input to MenusCardsComponent', () => {
    component.menus = [{ name: 'Dish 1' }, { name: 'Dish 2' }];
    fixture.detectChanges();
    
    const menusCardComponent = fixture.debugElement.query(By.directive(MenusCardsComponent));
    expect(menusCardComponent.componentInstance.menu$).toEqual(component.menus);
  });
  it('should pass orders input to GraphOrderComponent', () => {
    component.orders = [{ orderId: 1, amount: 20 }];
    fixture.detectChanges();
    
    const graphOrderComponent = fixture.debugElement.query(By.directive(GraphOrderComponent));
    expect(graphOrderComponent.componentInstance.ordersPerMonth).toEqual(component.orders);
  });

  it('should pass menus input to GraphDishComponent', () => {
    component.menus = [{ name: 'Dish 1' }];
    fixture.detectChanges();

    const graphDishComponent = fixture.debugElement.query(By.directive(GraphDishComponent));
    expect(graphDishComponent.componentInstance.menu).toEqual(component.menus);
  });
  it('should pass orders input to TableClientComponent', () => {
    component.orders = [{ orderId: 1 }];
    fixture.detectChanges();

    const tableClientComponent = fixture.debugElement.query(By.directive(TableClientComponent));
    expect(tableClientComponent.componentInstance.order).toEqual(component.orders);
  });
  it('should render the dashboard title', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.dashboard__title')).nativeElement;
    expect(title.textContent).toBe('Restaurant Dashboard');
  });

});
