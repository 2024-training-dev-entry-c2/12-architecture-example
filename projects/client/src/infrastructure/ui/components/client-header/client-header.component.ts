import { Component, output } from '@angular/core';
import { HeaderComponent } from 'shared';
import { IClient } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-client-header',
  imports: [HeaderComponent],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent {
  clientName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  registrationDate: Date = new Date();
  frequentUser: boolean = false;
  vip: boolean = false;
  onSubmitClient = output<IClient>();

  submitMenu(): void {
    if(this.clientName.trim()) {
      const client: IClient = {
        idClient: null, 
        clientName: this.clientName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        registrationDate: this.registrationDate,
        frequentUser: this.frequentUser,
        vip: this.vip
      };
      this.onSubmitClient.emit(client);
    }
   
  }
}
