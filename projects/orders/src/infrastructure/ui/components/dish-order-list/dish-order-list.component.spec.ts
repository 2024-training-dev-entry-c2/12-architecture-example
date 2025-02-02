import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishOrderListComponent } from './dish-order-list.component';

describe('DishOrderListComponent', () => {
  let component: DishOrderListComponent;
  let fixture: ComponentFixture<DishOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
