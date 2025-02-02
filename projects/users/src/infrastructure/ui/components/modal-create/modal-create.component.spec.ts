import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateComponent } from './modal-create.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, FormInputComponent } from 'shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ModalCreateComponent', () => {
  let component: ModalCreateComponent;
  let fixture: ComponentFixture<ModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateComponent,
        ReactiveFormsModule,
        FormInputComponent,
        ButtonComponent,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the register modal', () => {
    const registerModal = fixture.debugElement.query(By.css('.register-modal'));
    expect(registerModal).toBeTruthy();
  });

  it('should initialize the form with email and password controls', () => {
    const form = component.registerForm();
    expect(form).toBeInstanceOf(FormGroup);
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
  });
});
