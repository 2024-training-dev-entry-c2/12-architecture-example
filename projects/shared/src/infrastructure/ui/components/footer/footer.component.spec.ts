import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer', () => {
    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy(); 
  });

  it('should render the correct copyright text', () => {
    const copyrightText = compiled.querySelector('.footer__copyright');
    expect(copyrightText?.textContent).toBe('© Karen Rincón, 2025');
  });
});
