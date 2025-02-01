import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { IClient } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-client-main',
  imports: [DatePipe, CommonModule],
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.scss'
})
export class ClientMainComponent {
  public clients = input<IClient[]>();
  @Output() deleteClientEvent = new EventEmitter<number>();
  @Output() editClientEvent = new EventEmitter<IClient>();

  getHeaders() {
    return [
      { label: 'Cliente ID' },
      { label: 'Nombre del Cliente' },
      { label: 'Correo' },
      { label: 'Telefono' },
      { label: 'Direccion' },
      { label: 'Fecha de Registro' },
      { label: 'Usuario Frecuente' },
      { label: 'VIP' },
      { label: 'Acciones' },
    ];
  }

  getActions() {
    return [
      {
        label: 'Editar',
        type: 'edit',
        icon: 'svg/edit.svg#edit',
      },
      {
        label: 'Eliminar',
        type: 'delete',
        icon: 'svg/delete.svg#delete',
      },
    ];
  }

   openDeleteModal(idClient: number): void {
      this.deleteClientEvent.emit(idClient);
    }
  
    openEditModal(client: IClient): void {
      this.editClientEvent.emit(client);
    }
}
