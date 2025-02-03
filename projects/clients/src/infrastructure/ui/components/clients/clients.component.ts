import { Component, input, output, viewChild } from '@angular/core';
import { IClient } from '../../../../domain/model/clients.model';
import { ClientsFormComponent } from "../../forms/clients-form/clients-form.component";
import { ModalComponent } from 'shared';
import { NgFor } from '@angular/common';

@Component({
  selector: 'lib-clients',
  imports: [ModalComponent, NgFor, ClientsFormComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  public modal = viewChild<ModalComponent>('modal');

  public clients = input.required<IClient[]>();
  public onCreateClient = output<{client: IClient; modal: ModalComponent}>(); 
  public onSelectClient = output<string>();
  public currentClient = input<IClient>();
  public onDeleteClient = output<string>();

  handleSubmit(client: IClient) {
   this.onCreateClient.emit({client, modal: this.modal()});
  }

  selectClient(id: string){
    this.onSelectClient.emit(id);
    this.modal().toggle();
  }

  deleteClient(id: string){
      this.onDeleteClient.emit(id);
  }
}
