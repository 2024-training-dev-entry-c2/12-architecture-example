import { Component, EventEmitter, Output, output, ViewChild } from '@angular/core';
import { HeaderComponent } from 'shared';
import { IClient } from '../../../../domain/model/clients.model';
import { CommonModule } from '@angular/common';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';

@Component({
  selector: 'lib-client-header',
  imports: [HeaderComponent, CommonModule, ClientFormComponent],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent {
  @Output() onSubmitClient = new EventEmitter<IClient>();
  @ViewChild(ClientFormComponent) clientForm!: ClientFormComponent;
  
    submitClient(): void {
      if (this.clientForm && this.clientForm.form.valid) {
        const client = this.clientForm.getFormData();
        if (client) {
          console.log('Sending client data:', client);
          this.onSubmitClient.emit(client);
          this.clientForm.resetForm();
        }
      }
    }
}
