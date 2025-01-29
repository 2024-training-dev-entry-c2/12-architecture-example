import { Component, inject } from '@angular/core';
import { TableClientComponent } from '../../components/table/table.component';
import { GetUsersListUsecase } from '../../../../application/clients/list-client.usercase';
import { IClient } from '../../../../domain/model/client.model';


@Component({
  selector: 'lib-list-client',
  imports: [TableClientComponent ],
  templateUrl: './list-client.component.html',
 
})
export class ListClientComponent {
  private readonly __useCaseList = inject(GetUsersListUsecase);
  clientList: IClient[] = [];

  
  ngOnInit(): void {
    this.__useCaseList.initSubscriptions();
    this.getClients();
  } 
  getClients(){
    this.__useCaseList.execute();


    this.__useCaseList.clients$().subscribe({
      next: (clients: IClient[]) => {
        console.log('Clientes obtenidos:', clients); 
      
        this.clientList = clients;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err); 
      },
    });
    
  }

}
