import { TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { provideRouter, Router, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'orders', component: NavigationComponent },  
];

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the navigation', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('li')).toBeTruthy();
  });

  it('should render the svg', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.componentRef.setInput('icon', 'edit');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.icon()).toBe('edit');
    expect(compiled.querySelector('use').getAttribute('href')).toBe('icons.svg#edit');
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.componentRef.setInput('title', 'Orders');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.title()).toBe('Orders');
    expect(compiled.querySelector('span').textContent).toBe('Orders');
  });

  it('should render the routerLink', async () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.componentRef.setInput('link', 'orders');

    const component = fixture.componentInstance;
    fixture.detectChanges();
 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.link()).toBe('orders');
    expect(compiled.querySelector('a')?.getAttribute('href')).toBe('/orders');
  });

  it('should render the routerLinkActive', async () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const router = TestBed.inject(Router);
    fixture.componentRef.setInput('link', 'orders');

    fixture.detectChanges();
    await router.navigate(['orders']);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component.link()).toBe('orders');
    expect(compiled.querySelector('a')?.classList.contains('active')).toBeTruthy();
  });
});
