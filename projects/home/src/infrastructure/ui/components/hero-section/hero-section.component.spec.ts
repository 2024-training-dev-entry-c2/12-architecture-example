import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import { ThemeService } from 'shared';
import { of } from 'rxjs';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let themeServiceStub: Partial<ThemeService>;

  beforeEach(async () => {
    themeServiceStub = {
      themeState$: of(false), // Simula el tema claro por defecto
    };
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceStub }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the default light theme image', () => {
    expect(component.image).toBe('/assets/icons/logo-dark.svg');
  });

  it('should update image when theme changes to dark', () => {
    component.isDarkTheme = true;
    component.image = '/assets/icons/logo.svg';
    fixture.detectChanges();
    expect(component.image).toBe('/assets/icons/logo.svg');
  });

  it('should update image when theme changes to light', () => {
    component.isDarkTheme = false;
    component.image = '/assets/icons/logo-dark.svg';
    fixture.detectChanges();
    expect(component.image).toBe('/assets/icons/logo-dark.svg');
  });


  it('should update image when theme changes to dark', () => {
    component.isDarkTheme = true;
    component.image = '/assets/icons/logo.svg';
    fixture.detectChanges();
    expect(component.image).toBe('/assets/icons/logo.svg');
  }); 
});
