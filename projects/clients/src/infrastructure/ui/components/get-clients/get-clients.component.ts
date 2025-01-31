import { Component, EventEmitter, inject, input, Input, output, Output, viewChild } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { ButtonDeleteComponent } from '../button-delete/button-delete.component';
import { ButtonEditComponent } from "../button-edit/button-edit.component";
import { ModalComponent } from "shared";
import { AddClientFormComponent } from '../../forms/add-client-form/add-client-form.component';
import { ClientsState } from '../../../../domain/state/clients.state';
import { ButtonComponent } from "../../../../../../shared/src/infrastructure/ui/components/button/button.component";

@Component({
  selector: 'lib-get-clients',
  imports: [ButtonDeleteComponent, ButtonEditComponent, ModalComponent, AddClientFormComponent, ButtonComponent],
  templateUrl: './get-clients.component.html',
  styleUrl: './get-clients.component.scss'
})
export class GetClientsComponent {
  private clientsState = inject(ClientsState);
  public modal = viewChild<ModalComponent>('modal');
  public clients = input.required<IClient[]>();
  public currentClient = input<IClient>();
  public onCreateClient = output<{client: IClient; modal: ModalComponent}>();
  public onDeleteClient = output<number>();
  public onSelectClient = output<number>();
  public onSubmit = output<IClient>();

  public successMessage = this.clientsState.store().successMessage.snapshot();

  editClient(id: number) {
    this.onSelectClient.emit(id);
    this.modal().toggle();
  }
  deleteClient(id: number): void {
   this.onDeleteClient.emit(Number(id));
  }
  handleSubmit(client: IClient) {
    this.onCreateClient.emit({client, modal: this.modal()});
  }



}
