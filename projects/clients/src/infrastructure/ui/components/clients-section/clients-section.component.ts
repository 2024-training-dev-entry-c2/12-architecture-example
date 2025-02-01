import { Component, input, OnInit, output, viewChild } from '@angular/core';
import {  DeleteModalComponent, ModalComponent } from "shared";
import { SearchBarComponent } from "shared";
import { ClientFormComponent } from '../../forms/client-form/client-form.component';
import { IClient } from '../../../../domain/model/client.model';
import { ClientBoardComponent } from "../client-board/client-board.component";

@Component({
  selector: 'lib-clients-section',
  imports: [SearchBarComponent, ModalComponent, DeleteModalComponent ,ClientFormComponent, ClientBoardComponent],
  templateUrl: './clients-section.component.html',
  styleUrl: './clients-section.component.scss'
})
export class ClientsSectionComponent {
  public titles = ['#', 'Nombre', 'Correo electrónico', '¿Es frecuente?']
  public modalTitle = 'Crear Cliente';
  public formAction : string = 'Crear Cliente';
  public formTheme: 'success' | 'warning' = 'success';
  public isEditing = false;

  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<DeleteModalComponent>('deleteModal');
  public form = viewChild<ClientFormComponent>('clientForm');

  public clients = input.required<IClient[]>();
  public currentClient = input.required<IClient>();

  public onSave = output<{client: IClient, modal: ModalComponent}>();
  public onSelectToUpdate = output<number>();
  public onDelete = output<number>();

  public filteredClients: IClient[] = [];  

  handleFilteredData(data: IClient[]): void {
    this.filteredClients = data;
  }

  handleSubmit(client : IClient) {
    this.onSave.emit({client, modal: this.modal()});
  }

  handleCloseModal(){
    this.form().resetForm();
  }

  selectClientToUpdate(id:number){
    this.isEditing = true;
    this.modalTitle = 'Actualizar Cliente';
    this.formAction = 'Actualizar';
    this.formTheme = 'warning';

    this.onSelectToUpdate.emit(id);
    this.modal().toggle();
  }

  selectClientToDelete(id:number){
    this.deleteModal().openDeleteModal(id);
  }

  handleDelete(id: number){
    this.onDelete.emit(id);
  }

  openCreateModal() {
    this.isEditing = false;
    this.modalTitle = 'Crear Cliente';
    this.formAction = 'Crear Cliente';
    this.formTheme = 'success';
  }
}
