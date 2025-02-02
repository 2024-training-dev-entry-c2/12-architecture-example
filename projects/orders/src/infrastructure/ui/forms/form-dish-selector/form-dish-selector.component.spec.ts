import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDishSelectorComponent } from './form-dish-selector.component';

describe('FormDishSelectorComponent', () => {
  let component: FormDishSelectorComponent;
  let fixture: ComponentFixture<FormDishSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDishSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDishSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
