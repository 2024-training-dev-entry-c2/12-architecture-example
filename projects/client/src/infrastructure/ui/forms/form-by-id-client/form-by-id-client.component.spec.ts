import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormByIdClientComponent } from './form-by-id-client.component';

describe('FormByIdClientComponent', () => {
  let component: FormByIdClientComponent;
  let fixture: ComponentFixture<FormByIdClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormByIdClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormByIdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
