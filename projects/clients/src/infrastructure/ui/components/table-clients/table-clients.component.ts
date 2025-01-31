import { Component, input } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-table-clients',
  imports: [DatePipe],
  templateUrl: './table-clients.component.html',
  styleUrl: './table-clients.component.scss',
})
export class TableClientsComponent {

  public allClients = input<Iclient[]>([]);

  public itemsTable: string[] = [
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Fecha de creación',
    'Acciones',
  ];



}
