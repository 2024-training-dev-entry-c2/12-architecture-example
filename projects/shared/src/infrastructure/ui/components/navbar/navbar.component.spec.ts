import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const mockLogo = {
    url: '/home',
    src: 'assets/images/logo.png',
    alt: 'Gusteau\'s Restaurant Logo'
  };

  const mockNavLinks = [
    {
      name: 'Orders',
      path: '/orders',
      ariaLabel: 'Go to orders page'
    },
    {
      name: 'Clients',
      path: '/clients',
      ariaLabel: 'Go to clients page'
    },
    {
      name: 'Menus',
      path: '/menus',
      ariaLabel: 'Go to menus page'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavbarComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    component.logo = mockLogo;
    component.navLinks = mockNavLinks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo correctly', () => {
    const logoLink = fixture.nativeElement.querySelector('.menu__logo a');
    const logoImg = fixture.nativeElement.querySelector('.menu__logo img');
    
    expect(logoLink.getAttribute('href')).toBe('/home');
    expect(logoImg.getAttribute('src')).toBe('assets/images/logo.png');
    expect(logoImg.getAttribute('alt')).toBe('Gusteau\'s Restaurant Logo');
  });

  it('should render correct number of navigation links', () => {
    const navItems = fixture.nativeElement.querySelectorAll('.menu__navigation .menu__item');
    expect(navItems.length).toBe(mockNavLinks.length);
  });

  it('should render navigation links with correct attributes', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('.menu__navigation .menu__item a');
    
    navLinks.forEach((link: HTMLElement, index: number) => {
      expect(link.getAttribute('href')).toBe(mockNavLinks[index].path);
      expect(link.getAttribute('aria-label')).toBe(mockNavLinks[index].ariaLabel);
      expect(link.textContent.trim()).toBe(mockNavLinks[index].name);
    });
  });

  it('should have correct menu structure', () => {
    const menu = fixture.nativeElement.querySelector('.menu');
    const logoSection = menu.querySelector('.menu__logo');
    const navSection = menu.querySelector('.menu__navigation');
    
    expect(menu).toBeTruthy();
    expect(logoSection).toBeTruthy();
    expect(navSection).toBeTruthy();
  });

  it('should initialize with empty navLinks array if not provided', () => {
    const newFixture = TestBed.createComponent(NavbarComponent);
    const newComponent = newFixture.componentInstance;
    
    expect(newComponent.navLinks).toEqual([]);
  });

  it('should update view when inputs change', () => {
    const newNavLinks = [
      {
        name: 'New Link',
        path: '/new',
        ariaLabel: 'Go to new page'
      }
    ];

    component.navLinks = newNavLinks;
    fixture.detectChanges();

    const navItems = fixture.nativeElement.querySelectorAll('.menu__navigation .menu__item');
    const firstLink = navItems[0].querySelector('a');
    
    expect(navItems.length).toBe(1);
    expect(firstLink.textContent.trim()).toBe('New Link');
    expect(firstLink.getAttribute('href')).toBe('/new');
  });


  it('should render logo icon with correct attributes', () => {
    const logoIcon = fixture.nativeElement.querySelector('.menu__item-icon');
    expect(logoIcon.getAttribute('aria-hidden')).toBe('true');
  });

  it('should use RouterLink for navigation', () => {
    const logoLink = fixture.nativeElement.querySelector('.menu__logo a');
    const navLinks = fixture.nativeElement.querySelectorAll('.menu__navigation .menu__item a');
    
    expect(logoLink.getAttribute('ng-reflect-router-link')).toBe('/home');
    navLinks.forEach((link: HTMLElement, index: number) => {
      expect(link.getAttribute('ng-reflect-router-link')).toBe(mockNavLinks[index].path);
    });
  });

  it('should have correct CSS classes', () => {
    const menu = fixture.nativeElement.querySelector('.menu');
    const logoSection = menu.querySelector('.menu__logo');
    const navSection = menu.querySelector('.menu__navigation');
    const menuItems = menu.querySelectorAll('.menu__item');
    
    expect(menu.classList.contains('menu')).toBeTrue();
    expect(logoSection.classList.contains('menu__logo')).toBeTrue();
    expect(navSection.classList.contains('menu__navigation')).toBeTrue();
    menuItems.forEach((item: HTMLElement) => {
      expect(item.classList.contains('menu__item')).toBeTrue();
    });
  });
});