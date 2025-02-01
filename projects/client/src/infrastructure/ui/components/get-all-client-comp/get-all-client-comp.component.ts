import { Component, input,output,inject } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { RouterLink } from '@angular/router';
// import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'lib-get-all-client-comp',
  imports: [RouterLink],
  templateUrl: './get-all-client-comp.component.html',
  styleUrl: './get-all-client-comp.component.scss'
})
export class GetAllClientCompComponent {
  clients = input<IClient[]>();
  items = input<string[]>();
  public onDeleteClient = output<number>();
  public onUpdateClient = output<number>();

    // private router = inject(Router);

  deleteClient(id:number){
    this.onDeleteClient.emit(id);
  }

  updateClient(id:number){
    this.onUpdateClient.emit(id);
  }

  // saveClient(){
  //   this.router.navigate(['clientes/agregar']);
  // }

}
