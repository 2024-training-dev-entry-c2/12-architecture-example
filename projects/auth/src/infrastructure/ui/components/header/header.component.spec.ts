import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FontAwesomeModule], // Importar FontAwesome para el ícono
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el ícono de FontAwesome faPiggyBank', () => {
    const iconElement = fixture.debugElement.query(By.css('fa-icon'));
    expect(iconElement).toBeTruthy(); // Verifica que el ícono está en el DOM
  });

  it('debe mostrar el texto "Banking App"', () => {
    const logoText = fixture.debugElement.query(By.css('.header__logo span')).nativeElement.textContent.trim();
    expect(logoText).toBe('Banking App'); // Verifica que el texto sea el correcto
  });

  it('debe llamar a la función onLogout() cuando se hace clic en el botón', () => {
    spyOn(component, 'onLogout'); // Espía la función onLogout
    const logoutButton = fixture.debugElement.query(By.css('.header__signup-btn')).nativeElement;
    logoutButton.click(); // Simula el clic en el botón

    expect(component.onLogout).toHaveBeenCalled(); // Verifica que se llamó la función
  });

  it('debe renderizar los enlaces de navegación (si habilitados)', () => {
    // Habilitar la navegación simulando su inclusión en el HTML (opcional)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('a').length).toBeGreaterThan(0); // Verifica si existen enlaces
  });
});
