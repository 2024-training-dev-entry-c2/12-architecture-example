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
  });
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
  it('should to render nav items', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  });
  it('should update active navigation item on click', () => {
    const item = component.navItems[1];
    component.onNavItemClick(item);
    expect(component.navItems.some(nav => nav.active)).toBeTruthy();
    expect(item.active).toBeTruthy();
  });
  it('should call updateHoriSelector twice when onNavItemClick is triggered', () => {
    spyOn(component, 'updateHoriSelector');
    const item = component.navItems[1];
    component.onNavItemClick(item);
    expect(component.updateHoriSelector).toHaveBeenCalledTimes(1);
  });
  it('should call updateHoriSelector on window resize', () => {
    spyOn(component, 'updateHoriSelector');
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => {
      expect(component.updateHoriSelector).toHaveBeenCalled();
    }, 250);
  });
});
