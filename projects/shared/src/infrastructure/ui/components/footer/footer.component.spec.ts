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

  it('should display the current year in the footer', () => {
    const currentYear = new Date().getFullYear();
    const footerTextElement: HTMLElement = fixture.nativeElement.querySelector('.footer__text');
    expect(footerTextElement.textContent).toContain(`© ${currentYear} Account Manager. All rights reserved.`);
  });

  it('should update the year when the component is re-created', () => {
    const currentYear = new Date().getFullYear()
    const fixture2 = TestBed.createComponent(FooterComponent);
    const component2 = fixture2.componentInstance;
    fixture2.detectChanges();
    const footerTextElement2: HTMLElement = fixture2.nativeElement.querySelector('.footer__text');
    expect(footerTextElement2.textContent).toContain(`© ${currentYear} Account Manager. All rights reserved.`);
  });

});
