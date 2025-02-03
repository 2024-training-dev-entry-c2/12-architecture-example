import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.navbar__menu li'));
    expect(menuItems.length).toBe(5);
  });

  it('should have correct links for each menu item', () => {
    const expectedLinks = ['', '/customers', '/menus', '/dishes', '/orders'];
    const links = fixture.debugElement.queryAll(By.css('.navbar__link'));

    expect(links.length).toBe(5);
    links.forEach((link, index) => {
      expect(link.nativeElement.getAttribute('ng-reflect-router-link')).toBe(
        expectedLinks[index]
      );
    });
  });
});
