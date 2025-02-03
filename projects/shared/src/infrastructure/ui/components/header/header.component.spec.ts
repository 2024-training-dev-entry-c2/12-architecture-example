import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing'; 
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.options = [{
      url: "menus",
      name: "Menus"
    }, {
      url: "clientes",
      name: "Clientes"
    }, {
      url: "platos",
      name: "Platos"
    }, {
      url: "pedidos",
      name: "Pedidos"
    }];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Clientes" option', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const optionElements = Array.from(compiled.querySelectorAll('.header__option'));
    const clientesOption = optionElements.find(opt => opt.textContent?.trim() === 'Clientes');

    expect(clientesOption).toBeTruthy();
    expect(clientesOption?.getAttribute('ng-reflect-router-link')).toContain('clientes');
  });

});

