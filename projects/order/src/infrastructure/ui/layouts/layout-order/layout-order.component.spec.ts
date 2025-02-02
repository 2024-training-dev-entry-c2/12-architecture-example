import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOrderComponent } from './layout-order.component';

describe('LayoutOrderComponent', () => {
  let component: LayoutOrderComponent;
  let fixture: ComponentFixture<LayoutOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
