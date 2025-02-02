import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(currentYear.toString());
  });

  it('should have correct ARIA attributes', () => {
    const footer = fixture.nativeElement.querySelector('.footer__container');
    expect(footer.getAttribute('role')).toBe('contentinfo');
    expect(footer.getAttribute('aria-label')).toBe('Page footer');
  });
});