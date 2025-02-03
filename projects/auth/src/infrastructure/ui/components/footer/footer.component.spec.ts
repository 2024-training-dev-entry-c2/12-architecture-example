import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, SocialButtonComponent], // Declarar el componente y los hijos usados
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara la detección de cambios inicial
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se ha creado correctamente
  });

  it('debe renderizar el número correcto de botones sociales', () => {
    component.socialLinks = [
      { platform: 'Facebook', link: 'https://facebook.com' },
      { platform: 'Twitter', link: 'https://twitter.com' },
      { platform: 'Linkedin', link: 'https://linkedin.com' },
      { platform: 'Instagram', link: 'https://instagram.com' },
    ];
    fixture.detectChanges(); // Actualiza la vista

    const socialButtons = fixture.debugElement.queryAll(By.css('app-social-button'));
    expect(socialButtons.length).toBe(4); // Comprueba que se han renderizado 2 botones
  });

  it('debe mostrar el año actual correctamente', () => {
    const currentYear = new Date().getFullYear();
    component.currentYear = currentYear; // Simula el año actual
    fixture.detectChanges();

    const yearElement = fixture.debugElement.query(By.css('time')).nativeElement;
    expect(yearElement.textContent.trim()).toBe(currentYear.toString()); // Verifica que el año es correcto
  });
});
