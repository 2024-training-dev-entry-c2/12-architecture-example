import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormByIdOrderComponent } from './form-by-id-order.component';

describe('FormByIdOrderComponent', () => {
  let component: FormByIdOrderComponent;
  let fixture: ComponentFixture<FormByIdOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormByIdOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormByIdOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
