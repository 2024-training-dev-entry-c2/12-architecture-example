import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlInputComponent } from '../control-input/control-input.component';
import { CommonModule } from '@angular/common';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let formElement: HTMLFormElement;
  let emailInput: ControlInputComponent;
  let passwordInput: ControlInputComponent;
  let buttonSubmit: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, ReactiveFormsModule, CommonModule],
    })
      .overrideComponent(LoginFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
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
  it('should render the submit button', () => {
    expect(buttonSubmit).toBeTruthy();
    expect(buttonSubmit.textContent).toContain('Login');
  });
  it('should emit onSubmit event with form values if form is valid', () => {
    const emitSpy = spyOn(component.onSubmit, 'emit');
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    fixture.detectChanges();
    formElement.dispatchEvent(new Event('submit'));
    expect(emitSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
  it('should set errors if form is invalid', () => {
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    fixture.detectChanges();
    formElement.dispatchEvent(new Event('submit'));
    expect(component.loginErrors.emailError).toBeTrue();
    expect(component.loginErrors.passwordError).toBeTrue();
  });
  it('should reset error on input change', () => {
    component.loginErrors.emailError = true;
    fixture.detectChanges();
    emailInput.change.emit();
    expect(component.loginErrors.emailError).toBeFalse();
    component.loginErrors.passwordError = true;
    fixture.detectChanges();
    passwordInput.change.emit();
    expect(component.loginErrors.passwordError).toBeFalse();
  });
});
