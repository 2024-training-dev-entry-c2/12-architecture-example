import { Component, inject } from '@angular/core';
import { TableClientComponent } from '../../components/table/table.component';
import { GetUsersListUsecase } from '../../../../application/clients/list-client.usercase';
import { IClient } from '../../../../domain/model/client.model';
import { RemoveClientService } from '../../../services/remove/remove-client.service';
import { RemoveClientUsecase } from '../../../../application/clients/delete-client.usercase';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-list-client',
  imports: [TableClientComponent],
  templateUrl: './list-client.component.html',
})
export class ListClientComponent {
  private readonly __useCaseList = inject(GetUsersListUsecase);
  private readonly __useCaseGet = inject(RemoveClientUsecase);
  clientList: IClient[] = [];

  ngOnInit(): void {
    this.__useCaseList.initSubscriptions();
    this.getClients();
  }
  getClients() {
    this.__useCaseList.execute();

    this.__useCaseList.clients$().subscribe({
      next: (clients: IClient[]) => {
        this.clientList = clients;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }

  removeClient(id: number) {
    this.__useCaseGet.execute(id);
    setTimeout(() => {
      this.getClients();
    }, 1000);
  }

  closeModal() {
    setTimeout(() => this.getClients(), 1000);
    this.getClients();
  }
}
