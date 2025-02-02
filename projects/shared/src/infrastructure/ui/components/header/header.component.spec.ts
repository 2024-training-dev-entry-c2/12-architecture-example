import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavbarComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ThemeService } from '../../../services/toogle-theme/theme.service';


describe('HeaderComponent', () => {
  let component: HeaderNavbarComponent;
  let fixture: ComponentFixture<HeaderNavbarComponent>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;
  beforeEach(async () => {
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['toggleTheme'], {
      themeState$: of(false), // Simulamos el estado inicial como "modo claro"
    });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderNavbarComponent], 
      providers: [{ provide: ThemeService, useValue: themeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should to render nav  items', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  })
  it('should to call toggleTheme method when button is clicked', () => {
    component.toggleTheme();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });
  it('should to set active on path when setActiveOnPath is called', () => {
    component.setActiveOnPath();
    expect(component.navItems[0].active).toBeTrue();
  });
  it('shoud to  update icon when theme changes', () => {
    component.darkTheme = true;
    component.images = '/assets/icons/toogleMode.svg#icon-dark';
    fixture.detectChanges();
    expect(component.images).toBe('/assets/icons/toogleMode.svg#icon-dark');
    component.darkTheme = false;
    component.images = '/assets/icons/toogleMode.svg#icon-moon';
    fixture.detectChanges();
    expect(component.images).toBe('/assets/icons/toogleMode.svg#icon-moon');

  });

});
