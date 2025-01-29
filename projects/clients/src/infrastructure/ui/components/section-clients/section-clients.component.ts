import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IClients } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-section-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-clients.component.html',
  styleUrl: './section-clients.component.scss'
})
export class SectionClientsComponent {
  @Input() clients$!: Observable<IClients[]>;
  

  openEditModal(client: IClients): void {
    console.log('Edit client:', client);
 
  }

  openAddModal(client: IClients): void {
    console.log('Edit client:', client);
 
  }


  openDeleteModal(client: IClients): void {
    console.log('Delete client:', client);
    
  }

  tableContent = () => ['ID', 'Name', 'Email', 'Total Orders', 'User Type', 'Actions'];
}