import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllClientUseCase } from '../../../../application/get-all-client.useCase';
import { IClient } from '../../../../domain/model/client.model';
import { GetAllClientCompComponent } from '../../components/get-all-client-comp/get-all-client-comp.component';
import { AsyncPipe } from '@angular/common';
import { DeleteClientUseCase } from '../../../../application/delete-client.useCase';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'lib-get-all-client',
  imports: [GetAllClientCompComponent,AsyncPipe],
  templateUrl: './get-all-client.component.html',
  styles: ''
})
export class GetAllClientComponent implements OnInit, OnDestroy {

  private readonly getAllClientsUsecase = inject(GetAllClientUseCase);
  private readonly _deleteUseCase = inject (DeleteClientUseCase);
  public clients$: Observable<IClient[]>;
  items=["Nombre","ID","Cedula","Correo","Telefono","Tipo","Acciones"];

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getAllClientsUsecase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this.getAllClientsUsecase.execute();

    // console.log("ENTRO EN EL CONTEINER");
    this.clients$ = this.getAllClientsUsecase.clients$();
  }

  ngOnDestroy(): void {
    this.getAllClientsUsecase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleDeleteClient(id: number){
    this._deleteUseCase.execute(id);
  }
  
  handleUpdateClient(id:number){
    this.router.navigate(['clientes/actualizar',id]);
  }

}
