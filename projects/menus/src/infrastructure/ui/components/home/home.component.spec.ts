import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {} } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo with correct attributes', () => {
    const logo = compiled.querySelector('.home__icon use');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('xlink:href')).toBe('images/svg/logo.svg#logo-id');
  });

  it('should have the correct title text', () => {
    const title = compiled.querySelector('.home__title');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('CHEFLY');
  });

  it('should have the correct description text', () => {
    const description = compiled.querySelector('.home__description');
    expect(description).toBeTruthy();
    expect(description?.textContent?.trim()).toBe('Maneja tu restaurante de la forma más eficiente');
  });

  it('should have correct accessibility attributes', () => {
    const logo = compiled.querySelector('.home__icon');
    const button = compiled.querySelector('.home__button');

    expect(logo?.getAttribute('aria-hidden')).toBe('true');
    expect(logo?.getAttribute('aria-label')).toBe('Logo de Chefly');
    expect(button?.getAttribute('aria-label')).toBe('Ir a sección pedidos');
  });
});
