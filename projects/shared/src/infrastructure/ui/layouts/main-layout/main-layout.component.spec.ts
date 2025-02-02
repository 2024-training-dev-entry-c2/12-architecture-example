import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from '../aside/aside.component';
import { NavContainerComponent } from '../../containers/nav-container/nav-container.component';
import { By } from '@angular/platform-browser';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, RouterOutlet, AsideComponent, NavContainerComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should render the aside component', () => {
      const asideElement = fixture.debugElement.query(By.directive(AsideComponent));
        expect(asideElement).toBeTruthy();
  });

    it('should render the nav container component', () => {
        const navContainerElement = fixture.debugElement.query(By.directive(NavContainerComponent));
          expect(navContainerElement).toBeTruthy();
    });

   it('should have the layout with flex display', () => {
      const layoutElement = fixture.debugElement.query(By.css('.layout'));
       expect(getComputedStyle(layoutElement.nativeElement).display).toBe('flex');
   });


  it('should have the layout content with flex direction column', () => {
    const layoutContentElement = fixture.debugElement.query(By.css('.layout__content'));
    expect(getComputedStyle(layoutContentElement.nativeElement).flexDirection).toBe('column');
  });
   it('should have a main element with padding', () => {
        const mainElement = fixture.debugElement.query(By.css('main'));
         expect(getComputedStyle(mainElement.nativeElement).padding).toBe('24px');
   });
    it('should have a nav element with padding', () => {
      const navElement = fixture.debugElement.query(By.css('nav'));
      expect(getComputedStyle(navElement.nativeElement).padding).toBe('0px');
    });
});