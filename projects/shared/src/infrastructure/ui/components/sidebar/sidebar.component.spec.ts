import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMenuItem, SidebarComponent } from './sidebar.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { usersRoutes } from 'users';
import { ToastService } from '../../../services/toast.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, MenuItemComponent],
      providers: [
        ToastService,
        provideRouter(usersRoutes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu items correctly', () => {
    const menuItems: IMenuItem[] = [
      { iconSrc: 'icon1.png', menuTitle: 'Home', href: '/home' },
      { iconSrc: 'icon2.png', menuTitle: 'Profile', href: '/profile' }
    ];
    
    fixture.componentRef.setInput('menus', menuItems);
    fixture.detectChanges();

    const menuElements = fixture.debugElement.queryAll(By.css('lib-menu-item'));
    expect(menuElements.length).toBe(menuItems.length);
  });

  it('should emit an event when clicking the logout button', () => {
    spyOn(component.onClickLogout, 'emit');

    const logoutButton = fixture.debugElement.query(By.css('.sidebar__actions__button'));
    logoutButton.nativeElement.click();

    expect(component.onClickLogout.emit).toHaveBeenCalled();
  });
});
