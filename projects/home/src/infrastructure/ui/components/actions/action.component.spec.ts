import { TestBed } from '@angular/core/testing';
import { ActionsComponent } from './actions.component';

describe('ActionComponent', () => {
  it('botones de accion', () => {
    const fixture = TestBed.createComponent(ActionsComponent);
    const app = fixture.componentInstance;
    expect(app.buttons).toEqual([
      {
        name: 'Añadir plato',
        icon: 'add',
      },
      {
        name: 'Añadir cliente',
        icon: 'group',
      },
      {
        name: 'Añadir Menú',
        icon: 'book',
      },
      {
        name: 'Realizar pedido',
        icon: 'draftsOrders',
      },
    ]);
  });
});
