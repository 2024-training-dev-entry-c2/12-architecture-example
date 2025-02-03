import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { AsideComponent } from '../../components/aside/aside.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),  // Configuración del enrutador sin rutas, para pruebas
        AsideComponent,  // Importamos el componente 'AsideComponent' (standalone)
        MainLayoutComponent  // Se declara el componente principal
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se cree correctamente
  });

  it('should render the layout section', () => {
    const layoutElement = fixture.nativeElement.querySelector('section.layout');
    expect(layoutElement).toBeTruthy();  // Verifica que existe la etiqueta <section> con clase "layout"
  });

  it('should render the left side div with class "leftSide"', () => {
    const leftSideElement = fixture.nativeElement.querySelector('div.leftSide');
    expect(leftSideElement).toBeTruthy();  // Verifica que existe el div con clase "leftSide"
  });

  it('should render the body div with class "body"', () => {
    const bodyElement = fixture.nativeElement.querySelector('div.body');
    expect(bodyElement).toBeTruthy();  // Verifica que existe el div con clase "body"
  });

  it('should contain the lib-aside component', () => {
    const asideComponent = fixture.nativeElement.querySelector('lib-aside');
    expect(asideComponent).toBeTruthy();  // Verifica que el componente <lib-aside> está presente
  });

  it('should contain the router-outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();  // Verifica que el componente <router-outlet> está presente
  });
});
