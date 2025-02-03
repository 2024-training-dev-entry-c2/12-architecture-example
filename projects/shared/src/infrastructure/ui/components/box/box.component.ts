import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Idish } from 'dish';
import { Imenu } from 'menu';
import { Iorder } from 'orders';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-box',
  imports: [MatIconModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent {
  public clientesBox = input<Iclient[]>([]);
  public platosBox = input<Idish[]>([]);
  public menuBox = input<Imenu[]>([]);
  public pedidosBox = input<Iorder[]>([]);
  public menuByDishBox = input<Imenu[]>([]);
  public favoriteClientsBox = input<Iclient[]>([]);
  public porcentajeBox = input<number>();
  public mejoresPlatosBox = input<Idish[]>([]);
}
