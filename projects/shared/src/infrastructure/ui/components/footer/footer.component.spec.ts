import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the footer', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('footer')).toBeTruthy();
  });

  it('should render the copyright', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('p')).toBeTruthy();
    expect(compiled.querySelector('p').textContent).toBe('© 2025 Reino de las Hadas. Todos los derechos reservados.');
  });
});
