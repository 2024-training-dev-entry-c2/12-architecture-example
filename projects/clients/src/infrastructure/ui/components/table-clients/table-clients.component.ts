import { Component, input, output, viewChild } from '@angular/core';
import { Iclient } from '../../../../domain/model/client.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ModalComponent } from 'shared';
import { FormClientsComponent } from '../../forms/formClients/formClients.component';

@Component({
  selector: 'lib-table-clients',
  imports: [DatePipe, ModalComponent, FormClientsComponent],
  templateUrl: './table-clients.component.html',
  styleUrl: './table-clients.component.scss',
})
export class TableClientsComponent {

  public modal = viewChild<ModalComponent>('modal');
  public allClients = input<Iclient[]>([]);
  public currentClient = input<Iclient>();
  public onCreateClient = output<{client: Iclient; modal: ModalComponent}>();
  public onSelectClient = output<number>();
  public onDeleteClient = output<number>();
  public itemsTable: string[] = [
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Fecha de creación',
    'Acciones',
  ];

  handleSubmit(client: Iclient) {
    this.onCreateClient.emit({client: client, modal: this.modal()});
  }

  selectClient(id: number) {
    this.onSelectClient.emit(id);
    console.log('usuario seleccionado', id);
    this.modal().toggle();
  }

  deleteClient(id: number) {
    this.onDeleteClient.emit(id);
  }





}
