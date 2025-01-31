import { Component, input, output, viewChild } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { ModalComponent } from 'shared';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-client-page',
  imports: [ModalComponent, ClientFormComponent,CommonModule],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent {
  public modal = viewChild<ModalComponent>('modal');
  public clients = input<IClient[]>();
  public currentClient = input<IClient>();
  public onCreateClient = output<{client: IClient; modal: ModalComponent}>();
  public onSelectClient = output<number>();
  public onDelete = output<number>();

  handleSubmit(client: IClient) {
    this.onCreateClient.emit({client, modal: this.modal()});
    this.modal().toggle();
  }

  selectClient(id: number) {
    this.onSelectClient.emit(id);
    this.modal().toggle();
  }

  deleteClient(clientId: number): void {
    this.onDelete.emit(clientId);
  }
}
