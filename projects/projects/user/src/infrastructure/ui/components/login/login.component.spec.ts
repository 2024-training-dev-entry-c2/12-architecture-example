import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../forms/app-form-input/app-form-input.component';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        AuthFormComponent,
        FormInputComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    // Inicializar el formulario de login
    component.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    fixture.detectChanges();
  });


  // Verifica que el formulario marque los campos como tocados cuando se envía con datos inválidos
  it('should mark fields as touched when submitted with invalid data', () => {
    const touchSpy = spyOn(component.loginForm, 'markAllAsTouched');
    
    component.onSubmit();
    
    expect(touchSpy).toHaveBeenCalled();
    expect(component.loginForm.valid).toBeFalse();
  });
});