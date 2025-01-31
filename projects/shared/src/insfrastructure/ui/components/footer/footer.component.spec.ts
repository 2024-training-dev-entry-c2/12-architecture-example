import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a footer element with role="contentinfo"', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.attributes['role']).toBe('contentinfo');
  });

  it('should have a footer element with aria-label="Footer"', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.attributes['aria-label']).toBe('Footer');
  });

  it('should display the correct text', () => {
    const footerText = fixture.debugElement.query(
      By.css('.footer__text')
    ).nativeElement;
    expect(footerText.textContent).toBe(
      '© Todos los derechos reservados restaurante Mi dulce abuela 2025'
    );
  });
});
