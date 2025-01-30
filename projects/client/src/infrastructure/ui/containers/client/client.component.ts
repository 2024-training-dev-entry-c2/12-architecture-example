import { Component, inject, OnInit } from "@angular/core";
import { TableComponent } from "shared";
import { GetAllService } from "../../../services/client/get-all.service";
import { TitleCasePipe } from "@angular/common";
import { IClients } from "../../../../domain/model/client.model";
import { map, tap } from "rxjs";


@Component({
  selector: 'lib-client',
  imports: [TableComponent],
  providers: [TitleCasePipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent  {
  private getClients = inject(GetAllService);
  private titleCasePipe = inject(TitleCasePipe);

  public users: IClients[] = [];
  public columns = [
    {field: 'name', header: 'Nombre'},
    {field: 'lastName', header: 'Apellido'},
    {field: 'email', header: 'Correo'},
    {field: 'userType', header: 'Tipo de Usuario'}
  ];

  ngOnInit(): void {
    this.getClientsTable();
  }

  public getClientsTable(): void {
    this.getClients.execute()
      .pipe(
        map(result => result.map(client => ({ 
          ...client, 
          name: this.titleCasePipe.transform(client.name),
          lastName: this.titleCasePipe.transform(client.lastName)
         }))),
        tap(result => this.users = result)
      ).subscribe();
  }
}