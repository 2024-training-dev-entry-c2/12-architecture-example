import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../forms/app-form-input/app-form-input.component';
import { AuthFormComponent } from '../../forms/auth-form/auth-form.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent, 
        ReactiveFormsModule,
        AuthFormComponent,
        FormInputComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    
    // Configuración del formulario de registro
    component.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
    fixture.detectChanges();
  });

  // Test 1: Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verifica la emisión del formulario cuando es válido
  it('should emit form value when form is valid', () => {
    const submitSpy = spyOn(component.submited, 'emit');
    
    component.registerForm.setValue({
      email: 'test@example.com',
      password: '123456'
    });

    component.onSubmit();
    expect(submitSpy).toHaveBeenCalledWith(component.registerForm);
  });
});