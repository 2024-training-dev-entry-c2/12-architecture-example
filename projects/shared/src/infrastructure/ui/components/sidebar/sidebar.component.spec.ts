import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('lista de navegacion', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const app = fixture.componentInstance;
    expect(app.navItems).toEqual([
      { name: 'Home', icon: 'home', path: '/' },
      { name: 'Clientes', icon: 'group', path: '/clientes' },
      { name: 'Menu', icon: 'menu_book', path: '/menus' },
      { name: 'Platos', icon: 'restaurant', path: '/platos' },
      { name: 'Orders', icon: 'draftsOrders', path: '/ordenes' },
    ]);
  });

  it('Mas de un elemento', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const app = fixture.componentInstance;
    expect(app.navItems.length).toBeGreaterThan(0);
  });
});
