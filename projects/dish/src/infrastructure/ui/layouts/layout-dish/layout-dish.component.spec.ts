import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDishComponent } from './layout-dish.component';

describe('LayoutDishComponent', () => {
  let component: LayoutDishComponent;
  let fixture: ComponentFixture<LayoutDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
