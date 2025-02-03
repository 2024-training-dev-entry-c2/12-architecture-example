import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSharedComponent } from './footer-shared.component';
import { By } from '@angular/platform-browser';

describe('FooterSharedComponent', () => {
  let component: FooterSharedComponent;
  let fixture: ComponentFixture<FooterSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text "FOOTER"', () => {
    const footerElement = fixture.debugElement.query(By.css('.footer'));
    expect(footerElement.nativeElement.textContent).toBe('FOOTER');
  });

  it('should have a footer element', () => {
    const footerElement = fixture.debugElement.query(By.css('footer.footer'));
    expect(footerElement).toBeTruthy();
  });
});
