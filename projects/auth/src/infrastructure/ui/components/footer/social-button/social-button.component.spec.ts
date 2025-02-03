import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialButtonComponent } from './social-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';
import { faFacebookF, faTwitter, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

describe('SocialButtonComponent', () => {
  let component: SocialButtonComponent;
  let fixture: ComponentFixture<SocialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialButtonComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialButtonComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe asignar el ícono correcto basado en la plataforma (Facebook)', () => {
    component.platform = 'facebook';
    fixture.detectChanges(); // Inicializa ngOnInit

    expect(component.icon).toBe(faFacebookF);
  });

  it('debe asignar el ícono correcto basado en la plataforma (Twitter)', () => {
    component.platform = 'twitter';
    fixture.detectChanges(); // Inicializa ngOnInit

    expect(component.icon).toBe(faTwitter);
  });

  it('debe asignar el ícono correcto basado en la plataforma (LinkedIn)', () => {
    component.platform = 'linkedin';
    fixture.detectChanges(); // Inicializa ngOnInit

    expect(component.icon).toBe(faLinkedin);
  });

  it('debe arrojar un error si la plataforma no es válida', () => {
    component.platform = 'unknown';
    expect(() => component.ngOnInit()).toThrowError('Icono no encontrado');
  });

  it('debe renderizar el enlace con la URL correcta', () => {
    component.link = 'https://example.com';
    component.platform = 'facebook'; // Necesario para inicializar el ícono
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.href).toContain('https://example.com');
  });

  it('debe aplicar la clase correcta basada en la plataforma', () => {
    component.platform = 'instagram';
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.classList).toContain('instagram');
  });

  it('debe mostrar el ícono de FontAwesome en la plantilla', () => {
    component.platform = 'youtube';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('fa-icon'));
    expect(iconElement).toBeTruthy(); // Verifica que el componente fa-icon se renderizó
  });
});
