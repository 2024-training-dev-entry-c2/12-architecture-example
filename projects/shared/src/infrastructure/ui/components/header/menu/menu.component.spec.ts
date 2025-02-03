import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { ActivatedRoute } from '@angular/router';

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let componentRef;
  let component: MenuComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {} } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('items', [
      {url: 'enlace 1', text: 'opción 1'},
      {url: 'enlace 2', text: 'opción 2'},
    ]);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of menu items', () => {
    const menuItems = component.items();
    const menuListItems = compiled.querySelectorAll('li');
    expect(menuListItems.length).toBe(menuItems.length); 
  });

  it('should render menu item text in uppercase', () => {
    const menuItems = component.items();
    const menuLinks = compiled.querySelectorAll('a.menu__link');
    menuItems.forEach((item, index) => {
      expect(menuLinks[index].textContent).toBe(item.text.toUpperCase());
    });
  });

  it('should have correct attributes on menu links', () => {
    const menuItems = component.items();
    const menuLinks = compiled.querySelectorAll('a.menu__link');
    menuItems.forEach((item, index) => {
      const link = menuLinks[index];    

      expect(link.getAttribute('aria-posinset')).toBe((index + 1).toString());

      expect(link.getAttribute('aria-setsize')).toBe(menuItems.length.toString());
    
    });
  });

});
