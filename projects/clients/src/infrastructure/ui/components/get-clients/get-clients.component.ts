import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { ButtonEditComponent } from '../button-edit/button-edit.component';
import { ButtonDeleteComponent } from '../button-delete/button-delete.component';

@Component({
  selector: 'lib-get-clients',
  imports: [ButtonAddComponent, ButtonEditComponent, ButtonDeleteComponent],
  templateUrl: './get-clients.component.html',
  styleUrl: './get-clients.component.scss'
})
export class GetClientsComponent {
  @Input() clients: IClient[] = [];
  @Output() editClientEvent = new EventEmitter<number>();
  @Output() addClientEvent = new EventEmitter<void>();
  @Output() deleteClientEvent = new EventEmitter<number>();


 addClient() {
    this.addClientEvent.emit();
  }
  editClient(id: number) {
    this.editClientEvent.emit(id);
  }
  deleteClient(id: number): void {
   this.deleteClientEvent.emit(id);
  }

}
