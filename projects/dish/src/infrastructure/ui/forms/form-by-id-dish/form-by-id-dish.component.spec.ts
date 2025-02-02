import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormByIdDishComponent } from './form-by-id-dish.component';

describe('FormByIdDishComponent', () => {
  let component: FormByIdDishComponent;
  let fixture: ComponentFixture<FormByIdDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormByIdDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormByIdDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
