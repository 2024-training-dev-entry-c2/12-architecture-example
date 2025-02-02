import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSectionComponent } from './orders-section.component';

describe('OrdersSectionComponent', () => {
  let component: OrdersSectionComponent;
  let fixture: ComponentFixture<OrdersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
