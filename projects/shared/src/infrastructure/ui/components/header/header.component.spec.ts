import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Lista', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app.listMenu).toEqual([
      { name: 'Menú', path: '/menu' },
      { name: 'Platos', path: '/platos' },
      { name: 'Pedidos', path: '/ordenes' },
      { name: 'Clientes', path: '/clientes' },
    ]);
  });

  it('Mas de un elemento', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app.listMenu.length).toBeGreaterThan(0);
  });
});
