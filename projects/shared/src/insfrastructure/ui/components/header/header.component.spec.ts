import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header element with role="banner"', () => {
    const headerElement = fixture.debugElement.query(By.css('header'));
    expect(headerElement.attributes['role']).toBe('banner');
  });

  it('should have a nav element with role="navigation"', () => {
    const navElement = fixture.debugElement.query(By.css('nav'));
    expect(navElement.attributes['role']).toBe('navigation');
  });

  it('should have buttons with appropriate aria-labels', () => {
    const newOrderButton = fixture.debugElement.query(
      By.css('.header__button--new-order')
    );
    const addClientButton = fixture.debugElement.query(
      By.css('.header__button--add-client')
    );
    expect(newOrderButton.attributes['aria-label']).toBe('Nueva Orden');
    expect(addClientButton.attributes['aria-label']).toBe('Añadir Cliente');
  });

  it('should have icons with aria-hidden="true"', () => {
    const icons = fixture.debugElement.queryAll(By.css('.material-icons'));
    icons.forEach((icon) => {
      expect(icon.attributes['aria-hidden']).toBe('true');
    });
  });
});
