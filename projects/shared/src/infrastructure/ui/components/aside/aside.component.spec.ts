import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router'; // Importamos Router y RouterTestingModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Necesario para animaciones, si tu componente las usa
import { AsideComponent } from './aside.component';
import { Location } from '@angular/common';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    // Configuración inicial del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          { path: 'menus', component: AsideComponent }, // Definimos una ruta de prueba
        ]), 
        NoopAnimationsModule, // Si tu componente usa animaciones
        AsideComponent // Asegúrate de que el componente esté importado aquí
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyectamos el Router
    location = TestBed.inject(Location); // Inyectamos el Location
    fixture.detectChanges();
  });

  it('should render the logo image', () => {
    const logoElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(logoElement).toBeTruthy(); // Verifica que el logo se haya renderizado
    expect(logoElement.src).toContain('images/logo-restaurant.png'); // Verifica que el src del logo sea correcto
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });

  it('should apply active class when link is active', async () => {
    const linkElement = fixture.nativeElement.querySelector('a[routerLink="/menus"]');
    
    // Navegamos programáticamente a la ruta '/menus'
    await router.navigate(['/menus']);
    fixture.detectChanges();
    
    // Verifica que el enlace tenga la clase activa
    expect(linkElement.classList).toContain('navbar__link--active');
  });

  it('should have correct router links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].getAttribute('routerLink')).toBe('/'); // Verifica que el primer enlace tenga el routerLink correcto
    expect(links[1].getAttribute('routerLink')).toBe('/menus'); // Verifica que el segundo enlace tenga el routerLink correcto
    // Puedes seguir verificando los demás enlaces de la misma manera
  });

  it('should have correct text for each navigation link', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].textContent.trim()).toBe('Inicio');
    expect(links[1].textContent.trim()).toBe('Gestionar Menús');
    expect(links[2].textContent.trim()).toBe('Gestionar Cliente');
    expect(links[3].textContent.trim()).toBe('Gestionar Plato');
    expect(links[4].textContent.trim()).toBe('Gestionar Órdenes');
  });

  it('should have 5 navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(5); // Verifica que haya 5 enlaces de navegación
  });
});
