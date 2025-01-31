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
export class SectionClientsContentComponent implements OnInit, OnDestroy {
  private readonly _deleteClientUseCase = inject(DeleteClientUseCase);
  private readonly _createClientUseCase = inject(CreateClientUseCase);
  private readonly _editClientUseCase = inject(EditClientUseCase);
  private readonly _getClientUseCase = inject(GetClientUseCase);
  private readonly _formBuilder = inject(FormBuilder);

  clients$: Observable<IClients[]>;
  isModalOpen = false;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  selectedClient: IClients | null = null;

  clientForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Email', valueLabel: 'email' },
  ];

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
    this.isModalOpen = true;
    this.selectedClient = null;
    this.clientForm.reset();
  }

  openEditModal(client: IClients): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedClient = client;
    this.clientForm.patchValue(client);
  }

  openDeleteModal(client: IClients): void {
    this.modalType = 'delete';
    this.isModalOpen = true;
    this.selectedClient = client;
  }

  onSave(): void {
    if (this.clientForm.valid) {
      if (this.modalType === 'add') {
        this._createClientUseCase.execute(this.clientForm.value);
      } else if (this.modalType === 'edit' && this.selectedClient) {
        const updatedClient = { ...this.selectedClient, ...this.clientForm.value }
        this._editClientUseCase.execute(updatedClient);
        console.log(this.selectedClient)
      }
      this.closeModal();
    }
  }

  deleteClient(): void {
    if (this.selectedClient) {
      this._deleteClientUseCase.execute(this.selectedClient);
      this.closeModal();
  }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedClient = null;
    this.clientForm.reset();
  }

  ngOnDestroy(): void {
    this._getClientUseCase.destroySubscriptions();
    this._createClientUseCase.destroySubscriptions();
    this._editClientUseCase.destroySubscriptions();
    this._deleteClientUseCase.ngOnDestroy();
  }
}