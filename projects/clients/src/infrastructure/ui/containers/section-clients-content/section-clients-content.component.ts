import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SectionClientsComponent } from "../../components/section-clients/section-clients.component";
import { GetClientUseCase } from '../../../../application/clients/get-client.usescase';
import { Observable, tap } from 'rxjs';
import { IClients } from '../../../../domain/model/clients.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateClientUseCase } from '../../../../application/clients/create-client.usecase';
import { EditClientUseCase } from '../../../../application/clients/edit-client.usecase';
import { DeleteClientUseCase } from '../../../../application/clients/delete-client.usecase';


@Component({
  selector: 'lib-section-clients-content',
  imports: [SectionClientsComponent, CommonModule],
  templateUrl: './section-clients-content.component.html',
})
export class SectionClientsContentComponent  {
    clients$: Observable<IClients[]>;
    isModalOpen = false;
    modalType: 'add' | 'edit' | 'delete' = 'add';
    selectedClient: IClients | null = null;
  
    editData: any = null;
  
    constructor(
      private readonly _deleteClientUseCase: DeleteClientUseCase,
      private readonly _createClientUseCase: CreateClientUseCase,
      private readonly _editClientUseCase: EditClientUseCase,
      private readonly _getClientUseCase: GetClientUseCase
    ) {}
  
    ngOnInit(): void {
      this.clients$ = this._getClientUseCase.client$();
      this._getClientUseCase.execute();
      this._getClientUseCase.initSubscriptions();
      this._createClientUseCase.initSubscriptions();
      this._editClientUseCase.initSubscriptions();
      this._deleteClientUseCase.initSubscriptions();
    }
  
    openAddModal(): void {
      this.modalType = 'add';
      this.selectedClient = null;
      this.isModalOpen = true;
      this.editData = null;
  
    }
  
    openEditModal(client: IClients): void {
      this.modalType = 'edit';
      this.isModalOpen = true;
      this.selectedClient = client;
      this.editData = client; // GUARDAR LA VARIABLEEEEEEEEEEEEEEEEEEEEE
      console.log(this.editData)
    }
  
      openDeleteModal(client: IClients): void {
        this.modalType = 'delete';
        this.isModalOpen = true;
        this.selectedClient = client;
      }
  
      deleteClient(): void {
        if (this.selectedClient) {
          this._deleteClientUseCase.execute(this.selectedClient);
          this.closeModal();
      }
      }
  
    onSave(formValue: any): void {
      if (this.modalType === 'add') {
        this._createClientUseCase.execute(formValue);
      } else if (this.modalType === 'edit' && this.selectedClient) {
        const updatedClient = { ...this.selectedClient, ...formValue };
        this._editClientUseCase.execute(updatedClient);
      }
      this.closeModal();
    }
  
    
    closeModal(): void {
      this.isModalOpen = false;
      this.selectedClient = null;
      this.editData = null;
    }

    OnDestroy(): void {
      this._getClientUseCase.destroySubscriptions();
      this._createClientUseCase.destroySubscriptions();
      this._editClientUseCase.destroySubscriptions();
      this._deleteClientUseCase.ngOnDestroy();
    }
 
}