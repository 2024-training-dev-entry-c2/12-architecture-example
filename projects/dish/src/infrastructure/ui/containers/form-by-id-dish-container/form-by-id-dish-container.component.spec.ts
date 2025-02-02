import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormByIdDishContainerComponent } from './form-by-id-dish-container.component';

describe('FormByIdDishContainerComponent', () => {
  let component: FormByIdDishContainerComponent;
  let fixture: ComponentFixture<FormByIdDishContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormByIdDishContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormByIdDishContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
