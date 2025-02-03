import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMainLayoutComponent } from './order-main-layout.component';

describe('OrderMainLayoutComponent', () => {
  let component: OrderMainLayoutComponent;
  let fixture: ComponentFixture<OrderMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
