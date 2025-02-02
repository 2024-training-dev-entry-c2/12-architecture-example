import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should display the title', () => {
        const titleElement = fixture.debugElement.query(By.css('.navbar__title'));
          expect(titleElement.nativeElement.textContent).toContain('Bank Account');
    });
    it('should not display the menu by default', () => {
         const dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
         expect(dropdown).toBeFalsy();
    });
    it('should toggle the menu visibility when the avatar is clicked', () => {
        const avatar = fixture.debugElement.query(By.css('.navbar__avatar'));
          avatar.nativeElement.click();
          fixture.detectChanges();
         const dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
        expect(dropdown).toBeTruthy();

          avatar.nativeElement.click();
          fixture.detectChanges();
         const dropdown2 = fixture.debugElement.query(By.css('.navbar__dropdown'));
        expect(dropdown2).toBeFalsy();

    });
    it('should hide the menu when hideMenu is called', () => {
        component.showMenu = true;
         fixture.detectChanges();
        let dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
        expect(dropdown).toBeTruthy();

        component.hideMenu();
        fixture.detectChanges();
        dropdown = fixture.debugElement.query(By.css('.navbar__dropdown'));
         expect(dropdown).toBeFalsy();
    });

    it('should emit logoutClicked event when logout button is clicked', () => {
        spyOn(component.logoutClicked, 'emit');

        component.showMenu = true;
        fixture.detectChanges();
          const logoutButton = fixture.debugElement.query(By.css('.navbar__logout-btn'));
          logoutButton.nativeElement.click();
        expect(component.logoutClicked.emit).toHaveBeenCalled();
    });
      it('should stop the propagation when avatar is clicked', () => {
        const event = new Event('click');
          spyOn(event, 'stopPropagation');
         const avatar = fixture.debugElement.query(By.css('.navbar__avatar'));

         avatar.nativeElement.dispatchEvent(event);
        expect(event.stopPropagation).toHaveBeenCalled();

    });
    it('should have the navbar with flex display', () => {
          const navbarElement = fixture.debugElement.query(By.css('.navbar'));
        expect(getComputedStyle(navbarElement.nativeElement).display).toBe('flex');
   });
  it('should have the navbar with space-between justify-content', () => {
        const navbarElement = fixture.debugElement.query(By.css('.navbar'));
        expect(getComputedStyle(navbarElement.nativeElement).justifyContent).toBe('space-between');
   });
    it('should have the avatar with a width of 40px', () => {
        const avatarElement = fixture.debugElement.query(By.css('.navbar__avatar'));
        expect(getComputedStyle(avatarElement.nativeElement).width).toBe('40px');
    });
    it('should have the avatar with a height of 40px', () => {
        const avatarElement = fixture.debugElement.query(By.css('.navbar__avatar'));
        expect(getComputedStyle(avatarElement.nativeElement).height).toBe('40px');
    });

});