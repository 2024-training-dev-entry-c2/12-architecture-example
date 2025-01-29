import { Component, Input } from '@angular/core';
import { PaginationComponent, TableComponent } from 'shared';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-table',
  imports: [PaginationComponent,TableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableClientComponent {

@Input() dataClients: IClient[]=[];


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

}
