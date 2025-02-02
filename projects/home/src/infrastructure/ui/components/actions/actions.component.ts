import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-actions',
  imports: [MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  public buttons = [
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
  ];
 }
