import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HeaderSharedComponent } from './header-shared.component';
import { By } from '@angular/platform-browser';

describe('HeaderSharedComponent', () => {
  let component: HeaderSharedComponent;
  let fixture: ComponentFixture<HeaderSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a navigation menu with the correct links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('a'));
    const expectedLinks = [
      { label: 'Menu', link: '/' },
      { label: 'Clientes', link: '/client' },
      { label: 'Platos', link: '/platos' },
      { label: 'Pedidos', link: '/pedidos' }
    ];

    expect(navLinks.length).toBe(expectedLinks.length);

    navLinks.forEach((navLink, index) => {
      const expected = expectedLinks[index];
      expect(navLink.nativeElement.textContent.trim()).toBe(expected.label);
      expect(navLink.nativeElement.getAttribute('routerLink')).toBe(expected.link);
    });
  });

  it('should have a header element with the class "site-header"', () => {
    const headerElement = fixture.debugElement.query(By.css('header.site-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should have a nav element with the class "site-navigation"', () => {
    const navElement = fixture.debugElement.query(By.css('nav.site-navigation'));
    expect(navElement).toBeTruthy();
  });
});
