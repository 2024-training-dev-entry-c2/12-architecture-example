import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishContainerComponent } from './dish-container.component';

describe('DishContainerComponent', () => {
  let component: DishContainerComponent;
  let fixture: ComponentFixture<DishContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
