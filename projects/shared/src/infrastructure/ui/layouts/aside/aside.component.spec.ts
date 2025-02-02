import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsideComponent } from './aside.component';
import { By } from '@angular/platform-browser';

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideComponent], // Cambiamos declarations por imports
    }).compileComponents();

    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should emit toggleSidebar event when handleToggleSidebar is called', () => {
        spyOn(component.toggleSidebar, 'emit');
        component.handleToggleSidebar();
        expect(component.toggleSidebar.emit).toHaveBeenCalled();
    });

    it('should toggle isSidebarCollapsed when handleToggleSidebar is called', () => {
        const initialValue = component.isSidebarCollapsed;
        component.handleToggleSidebar();
        expect(component.isSidebarCollapsed).toBe(!initialValue);
        component.handleToggleSidebar();
        expect(component.isSidebarCollapsed).toBe(initialValue);
    });

    it('should have the sidebar with full width by default', () => {
        const sidebar = fixture.debugElement.query(By.css('.sidebar'));
        expect(sidebar.nativeElement.classList).not.toContain('sidebar--collapsed');
        expect(getComputedStyle(sidebar.nativeElement).width).toBe('256px');
    });
    
    it('should have the sidebar collapsed if isSidebarCollapsed is true', () => {
        component.isSidebarCollapsed = true;
        fixture.detectChanges();
        const sidebar = fixture.debugElement.query(By.css('.sidebar'));
        expect(sidebar.nativeElement.classList).toContain('sidebar--collapsed');
        expect(getComputedStyle(sidebar.nativeElement).width).toBe('64px');
        const userProfile = fixture.debugElement.query(By.css('.sidebar__user-profile'));
        expect(getComputedStyle(userProfile.nativeElement).display).toBe('none');
    });

    it('should display the username if it is provided', () => {
        component.username = 'Test User';
        fixture.detectChanges();
        const usernameElement = fixture.debugElement.query(By.css('.sidebar__user-profile h2'));
        expect(usernameElement.nativeElement.textContent).toContain('Test User');
    });

    it('should not display the username if it is not provided', () => {
        component.username = null;
        fixture.detectChanges();
        const usernameElement = fixture.debugElement.query(By.css('.sidebar__user-profile h2'));
        expect(usernameElement).toBeFalsy();
    });

    it('should call handleToggleSidebar when the toggle button is clicked', () => {
        spyOn(component, 'handleToggleSidebar');
        const toggleButton = fixture.debugElement.query(By.css('.sidebar__toggle-btn'));
        toggleButton.nativeElement.click();
        expect(component.handleToggleSidebar).toHaveBeenCalled();
    });
    it('should set aria-expanded to true when the sidebar is expanded', () => {
        component.isSidebarCollapsed = false;
        fixture.detectChanges();
        const toggleButton = fixture.debugElement.query(By.css('.sidebar__toggle-btn'));
        expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-expanded to false when the sidebar is collapsed', () => {
        component.isSidebarCollapsed = true;
        fixture.detectChanges();
        const toggleButton = fixture.debugElement.query(By.css('.sidebar__toggle-btn'));
        expect(toggleButton.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });
});