import { Component, inject, input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BoxComponent } from '../../components/box/box.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Idish } from 'dish';
import { Imenu } from 'menu';
import { Iorder } from 'orders';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-layout',
  imports: [HeaderComponent, BoxComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public dihes = input<Idish[]>([]);
  public menus = input<Imenu[]>([]);
  public orders = input<Iorder[]>([]);
  public clientes = input<Iclient[]>([]);
  public menusByDish = input<Imenu[]>([]);
  public favoriteClients = input<Iclient[]>([]);
  public porcentaje = input<number>();
  public mejoresPlatos = input<Idish[]>([]);
}
