import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have footer with correct accessibility attributes', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.attributes['role']).toBe('contentinfo');
    expect(footerElement.attributes['aria-label']).toBe('Footer');
  });

  it('should have correct CSS classes', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.classes['footer']).toBeTruthy();
  });

  it('should display footer text', () => {
    const textElement = fixture.debugElement.query(By.css('.footer__text'));
    expect(textElement.nativeElement.textContent).toContain(
      'Todos los derechos reservados restaurante Mi dulce abuela'
    );
  });

  it('should display correct copyright year', () => {
    const textElement = fixture.debugElement.query(By.css('.footer__text'));
    expect(textElement.nativeElement.textContent).toContain('2025');
  });
});
