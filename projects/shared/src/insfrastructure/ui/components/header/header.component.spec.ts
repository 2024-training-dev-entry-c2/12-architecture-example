import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterLink, RouterTestingModule],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have header with correct accessibility attributes', () => {
    const headerElement = fixture.debugElement.query(By.css('.header'));
    expect(headerElement.attributes['role']).toBe('banner');
    expect(headerElement.attributes['aria-label']).toBe('Main Header');
  });

  it('should render logo with correct image and text', () => {
    const logo = fixture.debugElement.query(By.css('.header__logo'));
    const logoImage = logo.query(By.css('.header__logo-image'));
    const logoText = logo.query(By.css('.header__logo-text'));

    expect(logoImage.attributes['alt']).toBe('Mi Dulce Abuela muffin logo');
    expect(logoText.nativeElement.textContent.trim()).toBe('Mi Dulce Abuela');
  });

  it('should render navigation menu with correct items', () => {
    const menuItems = fixture.debugElement.queryAll(
      By.css('.header__dropdown-link')
    );
    const expectedTexts = ['Clientes', 'Menús', 'Platos', 'Órdenes'];
    const expectedLinks = ['/customers', '/menus', '/dishes', '/orders'];

    menuItems.forEach((item, index) => {
      expect(item.nativeElement.textContent.trim()).toBe(expectedTexts[index]);
      expect(item.attributes['routerLink']).toBe(expectedLinks[index]);
    });
  });

  it('should render action buttons with correct labels', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.header__button'));
    const newOrderBtn = buttons.find(
      (btn) => btn.classes['header__button--new-order']
    );
    const addClientBtn = buttons.find(
      (btn) => btn.classes['header__button--add-client']
    );

    expect(newOrderBtn.attributes['aria-label']).toBe('Nueva Orden');
    expect(addClientBtn.attributes['aria-label']).toBe('Añadir Cliente');
  });

  it('should have dropdown button with correct accessibility attributes', () => {
    const dropdownBtn = fixture.debugElement.query(
      By.css('.header__button--dropdown')
    );
    expect(dropdownBtn.attributes['aria-expanded']).toBe('false');
    expect(dropdownBtn.attributes['aria-haspopup']).toBe('true');
  });

  it('should have navigation with correct accessibility attributes', () => {
    const nav = fixture.debugElement.query(By.css('.header__nav'));
    expect(nav.attributes['role']).toBe('navigation');
    expect(nav.attributes['aria-label']).toBe('Main Navigation');
  });
});
