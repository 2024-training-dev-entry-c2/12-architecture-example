import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationComponent, TableComponent } from 'shared';
import { IClient } from '../../../../domain/model/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-client-table',
  imports: [PaginationComponent,TableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableClientComponent {

@Input() dataClients: IClient[]=[];
@Output() deleteClient = new EventEmitter<number>();

  tabsList = [
    {
      title: 'Add client',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
      link:"/client/add"
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
      link:"/client"
    },
  ];
  sendToDelete(id: number) {
    console.log(id);
    
    this.deleteClient.emit(id);
  }

  constructor(private router: Router) {}
  redirectToClient(id: number): void {
    this.router.navigate(['/client', id]); 
  }
}
