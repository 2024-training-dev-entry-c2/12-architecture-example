import { Component, input, output, viewChild } from '@angular/core';

import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { UpdateClientFormComponent } from '../../forms/update-client-form/update-client-form.component';
import { PaginationComponent, TableComponent } from 'shared';
import { CreateClientFormComponent } from '../../forms/create-client-form/create-client-form.component';
// import { PaginationComponent, TableComponent } from '../../../../../../shared/src/public-api';


@Component({
  selector: 'lib-client-table',
  imports: [PaginationComponent,TableComponent, UpdateClientFormComponent,CreateClientFormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableClientComponent {

public dataClients = input.required<IClient[]>() ;
public deleteClient =  output<number>();
public createClient = output<IClientRequest>();
public currentClient = input<IClient>();
public onSelectClient = output<number>();
public clientID: number = 0;
public updateClient = output<{client: IClientRequest; id: number}>();

  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
      link:"/client/add"
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
      link:"/client"
    },
  ];
  sendTocreate(user: IClientRequest) {
    console.log(user);
    this.createClient.emit(user);
  }

  sendToDelete(id: number) {
    this.deleteClient.emit(id);
  }
  redirectToClient(id: number): void {
    this.onSelectClient.emit(id);
    this.clientID = id;
    this.showModal = true;
  }
  UpdateClient(user: IClientRequest) {
    this.updateClient.emit({client: user, id: this.clientID});
    alert("Client Updated");
  }
  showModal = false;
  closeModal() {
    this.showModal = false;
  }
}
