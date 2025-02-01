import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CreateClientUseCase } from '../../../../application/clients/create-client.usecase';
import { ListClientsUseCase } from '../../../../application/clients/list-clients.usecase';
import { IClient } from '../../../../domain/model/clients.model';
import { ClientHeaderComponent } from "../../components/client-header/client-header.component";
import { ShareComponent } from "shared";
import { ClientMainComponent } from "../../components/client-main/client-main.component";
import { ModalComponent } from "shared";
import { ClientFormComponent } from "../../forms/client-form/client-form.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchClientsUseCase } from '../../../../application/clients/search-client.usecase';
import { DeleteClientUseCase } from '../../../../application/clients/delete-client.usecase';
import { UpdateClientUseCase } from '../../../../application/clients/update-client.usecase';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-client-container',
  imports: [ClientHeaderComponent, ShareComponent, ClientMainComponent, ModalComponent, ClientFormComponent, AsyncPipe, CommonModule],
  templateUrl: './client-container.component.html'
})
export class ClientContainerComponent implements OnInit, OnDestroy{
   private readonly _listUsecase = inject(ListClientsUseCase);
   private readonly _createUsecase = inject(CreateClientUseCase);
   private readonly _searchUsecase = inject(SearchClientsUseCase);
   private readonly _deleteUsecase = inject(DeleteClientUseCase);
   private readonly _updateUsecase = inject(UpdateClientUseCase);
 
   public client$: Observable<IClient[]>;
 
   public isModalOpen = signal<boolean>(false);
   public selectedClientId = signal<number | null>(null);
 
   public modalTitle: string = '';
   public modalContent: string = '';
   public modalButton: string = '';
 
   public currentClientName = '';
   public currentEmail = '';
   public currentPhoneNumber = '';
   public currentAddress = '';
   public currentRegistrationDate = new Date();
   public currentFrequentUser = false;
   public currentVip = false;
   public clientName = '';
   public modalType: string = '';
 
   @ViewChild(ClientFormComponent) clientEditForm!: ClientFormComponent;
 
   ngOnInit(): void {
     this._listUsecase.initSubscriptions();
     this._createUsecase.initSubscriptions();
     this.loadClients();
     this.client$ = this._searchUsecase.filteredClients$();
   }
 
   ngOnDestroy(): void {
     this._listUsecase.destroySubscriptions();
     this._createUsecase.destroySubscriptions();
   }
 
   loadClients(): void {
     this._listUsecase.loadClients();
   }
 
   addClient(client: IClient): void {
     this._createUsecase.addClient(client);
   }
 
   updateSearchQuery(query: string): void {
     this._searchUsecase.setSearchQuery(query);
   }
 
   openDeleteModal(idClient: number): void {
     this.selectedClientId.set(idClient);
     this.modalTitle = 'Confirmar Eliminacion';
     this.modalButton = 'Confirmar';
     this.modalType = 'delete';
     this.isModalOpen.set(true);
   }
 
   openEditModal(client: IClient): void {
     this.selectedClientId.set(client.idClient);
     this.modalTitle = 'Editar Cliente';
     this.modalButton = 'Actualizar';
     this.currentClientName = client.clientName;
     this.currentEmail = client.email;
     this.currentPhoneNumber = client.phoneNumber;
     this.currentAddress = client.address;
     this.currentRegistrationDate = client.registrationDate;
     this.currentFrequentUser = client.frequentUser;
     this.currentVip = client.vip;
     this.modalType = 'edit';
     this.isModalOpen.set(true);
   }
 
   confirmModal(): void {
    if (this.modalType === 'delete') {
      this.deleteClient();
    } else if (this.modalType === 'edit' && this.clientEditForm) {
      const updatedClient = this.clientEditForm.getFormData();
      if (updatedClient) {
        this.updateClient(updatedClient);
      }
    }
    this.isModalOpen.set(false);
  }
  
 
   closeModal(): void {
     this.isModalOpen.set(false);
   }
 
   private deleteClient(): void {
     const clientId = this.selectedClientId();
     if (clientId) {
       this._deleteUsecase.deleteClient(clientId).subscribe(() => {
         this.loadClients();
       });
     }
   }
 
   updateClient(updatedClient: IClient): void {
    const clientId = this.selectedClientId();
    if (clientId) {
      this._updateUsecase.updateClient(clientId, updatedClient, this.client$).subscribe(() => {
        this.loadClients();
      });
    }
  }
  
}
