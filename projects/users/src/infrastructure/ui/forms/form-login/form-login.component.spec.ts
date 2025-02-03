import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLoginComponent } from './form-login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormLoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with default values', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
      rememberMe: false
    });
  });

  it('should show an error message when form is invalid and submitted', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
      rememberMe: false
    });

    component.login();

    expect(component.error).toBe('The form is invalid, please check the fields');
  });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue();
  });

  it('should submit form when valid', () => {
    component.loginForm.setValue({
      email: 'user@example.com',
      password: 'password123',
      rememberMe: true
    });

    component.login();

    expect(component.error).toBeNull();
  });
});
