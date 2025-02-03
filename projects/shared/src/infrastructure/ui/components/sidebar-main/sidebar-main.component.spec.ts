import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMainComponent } from './sidebar-main.component';

describe('SidebarMainComponent', () => {
  let component: SidebarMainComponent;
  let fixture: ComponentFixture<SidebarMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main element with the menu', () => {
    const fixture = TestBed.createComponent(SidebarMainComponent);
    fixture.detectChanges();
    const mainElement: HTMLElement = fixture.nativeElement.querySelector('main');
    expect(mainElement).toBeTruthy();
    const menuElement: HTMLElement = fixture.nativeElement.querySelector('menu');
    expect(menuElement).toBeTruthy();
  });
  
  it('should render the correct number of menu items', () => {
    const fixture = TestBed.createComponent(SidebarMainComponent);
    fixture.detectChanges();
    const menuItems = fixture.nativeElement.querySelectorAll('.menu__item');
    expect(menuItems.length).toBe(4); // El número de elementos en menuItems
  });
  
  
  it('should render menu items with the correct routerLink', () => {
    const fixture = TestBed.createComponent(SidebarMainComponent);
    fixture.detectChanges();
    const menuItems = fixture.nativeElement.querySelectorAll('.menu__item');
    menuItems.forEach((item, index) => {
      expect(item.getAttribute('routerLink')).toBe(component.menuItems[index].link);
    });
  });
  
  it('should render the correct icons for each menu item', () => {
    const fixture = TestBed.createComponent(SidebarMainComponent);
    fixture.detectChanges();
    const menuItems = fixture.nativeElement.querySelectorAll('.menu__item svg use');
    menuItems.forEach((item, index) => {
      expect(item.getAttribute('xlink:href')).toBe(component.menuItems[index].icon);
    });
  });
  
  it('should have role="main" and aria-roledescription="contenido principal" on the main element', () => {
    const fixture = TestBed.createComponent(SidebarMainComponent);
    fixture.detectChanges();
    const mainElement: HTMLElement = fixture.nativeElement.querySelector('main');
    expect(mainElement.getAttribute('role')).toBe('main');
    expect(mainElement.getAttribute('aria-roledescription')).toBe('contenido principal');
  });
  
});
