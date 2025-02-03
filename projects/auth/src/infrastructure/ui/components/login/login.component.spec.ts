import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FontAwesomeModule],
      providers: [FormBuilder], // Necesario para inicializar el formulario
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Inicializamos el formulario
    component.loginForm = formBuilder.group({
      email: [''],
      password: [''],
    });

    fixture.detectChanges(); // Detecta cambios iniciales
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar los íconos faUserPlus y faPiggyBank', () => {
    const userPlusIcon = fixture.debugElement.query(By.css('fa-icon[icon="faUserPlus"]'));
    const piggyBankIcon = fixture.debugElement.query(By.css('fa-icon[icon="faPiggyBank"]'));
    expect(userPlusIcon).toBeTruthy();
    expect(piggyBankIcon).toBeTruthy();
  });

  it('debe emitir el evento submited cuando el formulario es válido', () => {
    // Configura valores válidos
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    spyOn(component.submited, 'emit'); // Espía el evento emitido

    component.onSubmit(); // Ejecuta el método
    expect(component.submited.emit).toHaveBeenCalledWith(component.loginForm.value); // Verifica la emisión
  });

  it('debe marcar todos los controles como tocados si el formulario no es válido', () => {
    // Deja el formulario vacío (inválido)
    component.loginForm.setValue({ email: '', password: '' });
    spyOn(component.loginForm, 'markAllAsTouched'); // Espía el método

    component.onSubmit();
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled(); // Verifica la llamada
  });

  it('debe mostrar el mensaje de error si el formulario no es válido', () => {
    component.loginForm.setValue({ email: '', password: '' }); // Formulario inválido
    component.onSubmit();
    fixture.detectChanges(); // Refresca la vista

    const errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBeGreaterThan(0); // Verifica que se muestran los mensajes de error
  });
});
