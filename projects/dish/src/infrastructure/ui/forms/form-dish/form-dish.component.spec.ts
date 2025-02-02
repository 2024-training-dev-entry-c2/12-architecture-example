import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDishComponent } from './form-dish.component';

describe('FormDishComponent', () => {
  let component: FormDishComponent;
  let fixture: ComponentFixture<FormDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
