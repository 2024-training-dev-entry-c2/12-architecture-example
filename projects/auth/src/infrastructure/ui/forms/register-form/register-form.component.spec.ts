import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ControlInputComponent } from '../control-input/control-input.component';
import { CommonModule } from '@angular/common';
import { ControlSelectComponent } from '../control-select/control-select.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let formElement: HTMLFormElement;
  let emailInput: ControlInputComponent;
  let passwordInput: ControlInputComponent;
  let roleSelect: ControlSelectComponent;
  let buttonSubmit: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, ReactiveFormsModule, CommonModule],
    })
      .overrideComponent(RegisterFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formElement = fixture.nativeElement.querySelector('form');
    emailInput = fixture.debugElement.query(
      (debugElement) =>
        debugElement.componentInstance instanceof ControlInputComponent &&
        debugElement.attributes['id'] === 'email'
    ).componentInstance;
    passwordInput = fixture.debugElement.query(
      (debugElement) =>
        debugElement.componentInstance instanceof ControlInputComponent &&
        debugElement.attributes['id'] === 'password'
    ).componentInstance;
    roleSelect = fixture.debugElement.query(
      (debugElement) =>
        debugElement.componentInstance instanceof ControlSelectComponent &&
        debugElement.attributes['id'] === 'role'
    ).componentInstance;
    buttonSubmit = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the form', () => {
    expect(formElement).toBeTruthy();
  });
  it('should render email input', () => {
    expect(emailInput).toBeTruthy();
    expect(emailInput.title()).toBe('Email');
    expect(emailInput.id()).toBe('email');
  });

  it('should render password input', () => {
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.title()).toBe('Password');
    expect(passwordInput.id()).toBe('password');
  });
  it('should render role select', () => {
    expect(roleSelect).toBeTruthy();
    expect(roleSelect.title()).toBe('Role');
    expect(roleSelect.id()).toBe('role');
  });
  it('should render the submit button', () => {
    expect(buttonSubmit).toBeTruthy();
    expect(buttonSubmit.textContent).toContain('Register');
  });
  it('should emit onSubmit event with form values if form is valid', () => {
    const emitSpy = spyOn(component.onSubmit, 'emit');
    component.registerForm.get('email')?.setValue('test@example.com');
    component.registerForm.get('password')?.setValue('Password1!');
    component.registerForm.get('role')?.setValue('ADMIN');
    fixture.detectChanges();
    formElement.dispatchEvent(new Event('submit'));
    expect(emitSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password1!',
      role: 'ADMIN',
    });
  });
  it('should set errors if form is invalid', () => {
    component.registerForm.get('email')?.setValue('');
    component.registerForm.get('password')?.setValue('');
    component.registerForm.get('role')?.setValue('');
    fixture.detectChanges();
    formElement.dispatchEvent(new Event('submit'));
    expect(component.registerErrors.emailError).toBeTrue();
    expect(component.registerErrors.passwordError).toBeTrue();
    expect(component.registerErrors.roleError).toBeTrue();
  });
  it('should reset error on input change', () => {
    component.registerErrors.emailError = true;
    fixture.detectChanges();
    emailInput.change.emit();
    expect(component.registerErrors.emailError).toBeFalse();
    component.registerErrors.passwordError = true;
    fixture.detectChanges();
    passwordInput.change.emit();
    expect(component.registerErrors.passwordError).toBeFalse();
    component.registerErrors.roleError = true;
    fixture.detectChanges();
    roleSelect.change.emit();
    expect(component.registerErrors.roleError).toBeFalse();
  });
});
