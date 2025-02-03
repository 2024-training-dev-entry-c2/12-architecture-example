import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFooterComponent } from './sidebar-footer.component';

describe('SidebarFooterComponent', () => {
  let component: SidebarFooterComponent;
  let fixture: ComponentFixture<SidebarFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the footer element', () => {
    const footerElement: HTMLElement = fixture.nativeElement.querySelector('footer');
    expect(footerElement).toBeTruthy();
  });
  
  it('should contain an icon with the class footer__icon', () => {
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('.footer__icon');
    expect(iconElement).toBeTruthy();
  });
  
  it('should contain the correct text in the h2 element', () => {
    const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2.footer__text');
    expect(h2Element.textContent).toBe('Daniela');
  });
  
});
