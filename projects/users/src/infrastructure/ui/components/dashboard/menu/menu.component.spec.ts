import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { OpcionItemComponent } from './opcion-item/opcion-item.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule, MenuComponent, OpcionItemComponent, MenuItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have menuOptions and menuOptions2 initialized', () => {
        expect(component.menuOptions.length).toBeGreaterThan(0);
        expect(component.menuOptions2.length).toBeGreaterThan(0);
    });

    it('should set activeMenu correctly', () => {
        const testMenu = 'users';
        component.setActiveMenu(testMenu);
        expect(component.activeMenu).toBe(testMenu);
    });

    it('should render the menu items correctly', () => {
        const compiled = fixture.nativeElement;
        const menuItems = compiled.querySelectorAll('.sidebar__menu-nav-item');
        expect(menuItems.length).toBe(component.menuOptions2.length);
    });

    it('should apply active class to the correct menu item', () => {
        const testMenu = 'user';
        component.setActiveMenu(testMenu);
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        const activeMenuItem = compiled.querySelector('.sidebar__menu-nav-item--active');
        expect(activeMenuItem).toBeTruthy();
        expect(activeMenuItem.textContent).toContain('User Admin');
    });
});