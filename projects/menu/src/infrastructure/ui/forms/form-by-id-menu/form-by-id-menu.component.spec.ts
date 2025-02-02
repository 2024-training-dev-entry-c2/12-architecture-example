import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormByIdMenuComponent } from './form-by-id-menu.component';

describe('FormByIdMenuComponent', () => {
  let component: FormByIdMenuComponent;
  let fixture: ComponentFixture<FormByIdMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormByIdMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormByIdMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
