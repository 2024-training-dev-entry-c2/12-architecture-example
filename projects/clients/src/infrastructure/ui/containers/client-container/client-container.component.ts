import { Component, inject } from '@angular/core';
import { GetClientsUsecase } from '../../../../application/clients/get-clients.usecase';
import { Observable } from 'rxjs';
import { IClient } from '../../../../domain/model/client.model';
import { GetClientsComponent } from '../../components/get-clients/get-clients.component';
import { AsyncPipe } from '@angular/common';
import { DeleteClientUsecase } from '../../../../application/clients/delete-client.usecase';
import { CreateClientUsecase } from '../../../../application/clients/create-client.usecase';
import { ModalComponent } from "../../components/modal/modal.component";
import { AddClientFormComponent } from "../../forms/add-client-form/add-client-form.component";


@Component({
  selector: 'lib-client-container',
  imports: [GetClientsComponent, AsyncPipe, ModalComponent, AddClientFormComponent],
  templateUrl: './client-container.component.html',
})
export class ClientContainerComponent {
  private readonly _useCase = inject(GetClientsUsecase);
  private readonly _deleteClientUsecase = inject(DeleteClientUsecase);
  private readonly _createClientUsecase = inject(CreateClientUsecase);

  public clients$: Observable<IClient[]>;
  isModalVisible: boolean = false;
  mensajeExito: string | null = null;
  isEditMode: boolean = false;
  clientEdit: IClient | null = null;

  ngOnInit(): void {
    this._useCase.initSubscriptions();
    this.clients$ = this._useCase.clients$();
    this._createClientUsecase.initSubscriptions();
    this._deleteClientUsecase.initSubscriptions();
    this.getClients();
  }

  getClients(): void {
    this._useCase.execute();
  }
  deleteClient(id: number): void {
    this._deleteClientUsecase.execute(id)
  }
  openModal(): void {
    this.isModalVisible = true;
  }
  closeModal(): void {
    this.isModalVisible = false;
  }
  onClientSubmitted(client: IClient): void {
    this._createClientUsecase.execute(client);
  }

  ngOnDestroy(): void {
    this._useCase.destroySubscriptions();
    this._createClientUsecase.destroySubscriptions();
    this._deleteClientUsecase.destroySubscriptions();
  }


}
