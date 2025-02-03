import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para manejar el formulario
      providers: [FormBuilder], // Necesario para crear el formulario
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Inicializa el formulario antes de cada prueba
    component.registerForm = formBuilder.group({
      email: [''],
      password: [''],
      document: [''],
    });

    fixture.detectChanges(); // Detecta los cambios iniciales
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar los campos del formulario', () => {
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('document')?.value).toBe('');
  });

  it('debe permitir ingresar valores en los campos del formulario', () => {
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    const documentInput = fixture.debugElement.query(By.css('#documento')).nativeElement;

    emailInput.value = 'test@example.com';
    passwordInput.value = 'password123';
    documentInput.value = '123456789';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    documentInput.dispatchEvent(new Event('input'));

    expect(component.registerForm.get('email')?.value).toBe('test@example.com');
    expect(component.registerForm.get('password')?.value).toBe('password123');
    expect(component.registerForm.get('document')?.value).toBe('123456789');
  });

  it('debe emitir el evento submited cuando el formulario es válido', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      document: '123456789',
    });

    spyOn(component.submited, 'emit'); // Espía el evento emitido

    component.onSubmit(); // Llama al método onSubmit

    expect(component.submited.emit).toHaveBeenCalledWith(component.registerForm);
  });

  it('no debe emitir el evento submited si el formulario es inválido', () => {
    component.registerForm.setValue({
      email: '',
      password: '',
      document: '',
    });

    spyOn(component.submited, 'emit');

    component.onSubmit();

    expect(component.submited.emit).not.toHaveBeenCalled();
  });
});
