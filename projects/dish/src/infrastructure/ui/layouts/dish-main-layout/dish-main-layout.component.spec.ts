import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMainLayoutComponent } from './dish-main-layout.component';

describe('DishMainLayoutComponent', () => {
  let component: DishMainLayoutComponent;
  let fixture: ComponentFixture<DishMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
