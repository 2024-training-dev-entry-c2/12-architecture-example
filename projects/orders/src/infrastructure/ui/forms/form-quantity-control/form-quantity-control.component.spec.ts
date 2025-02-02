import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuantityControlComponent } from './form-quantity-control.component';

describe('FormQuantityControlComponent', () => {
  let component: FormQuantityControlComponent;
  let fixture: ComponentFixture<FormQuantityControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuantityControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQuantityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
