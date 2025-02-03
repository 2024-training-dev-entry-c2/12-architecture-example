import { Component,OnDestroy,OnInit,inject } from '@angular/core';
import { FormClientComponent } from '../../forms/form-client/form-client.component';
import { ActivatedRoute,Router } from '@angular/router';
import { IClient } from '../../../../domain/model/client.model';
import { GetByIdClientUseCase } from '../../../../application/get-by-id-client.useCase';
import { Observable,of,pipe,tap } from "rxjs";
import { AsyncPipe, NgIf } from '@angular/common';
import { UpdateClientUseCase } from '../../../../application/update-client.useCase';
import { RegisterClientUseCase } from '../../../../application/register-client.useCase';


@Component({
  selector: 'lib-form-client-conteiner',
  imports: [FormClientComponent,AsyncPipe,NgIf],
  templateUrl: './form-client-conteiner.component.html',
  styles: ''
})

export class FormClientConteinerComponent implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getClientByIdUseCase = inject(GetByIdClientUseCase);
  private updateClientUseCase =  inject(UpdateClientUseCase);
  private createClientUseCase = inject(RegisterClientUseCase);

  public idClient?:number;
  public client:IClient;
  client$!: Observable<IClient>;

  public title:string;
  public action:string;

  ngOnInit(): void {

    this.updateClientUseCase.initSubscriptions();
    this.getClientByIdUseCase.initSubscriptions();
    this.createClientUseCase.initSubscriptions();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idClient = +idParam;
        this.action='update';
        this.title='Actualizar Cliente';
        this.loadClientData(this.idClient);
      }else{
        this.client$ = of({} as IClient);
        this.action='save';
        this.title='Registrar Cliente';
      }

    });
  }

  ngOnDestroy(): void {
      this.updateClientUseCase.destroySubscriptions();
      this.getClientByIdUseCase.destroySubscriptions();
      this.createClientUseCase.destroySubscriptions();
  }

  private loadClientData(id: number): void {
    this.getClientByIdUseCase.execute(id);
    this.client$ = this.getClientByIdUseCase.client$();
  }

  // handleSubmit(client: IClient){
  //   if(this.action==='update'){
  //     this.updateClientUseCase.execute(this.idClient,client);
  //     this.router.navigate(['clientes']);
  //   }else{
  //     this.createClientUseCase.execute(client);
  //     this.router.navigate(['clientes']);
  //   }
  // }

  // handleSubmit(client: IClient) {
  //   const useCase = this.action === 'update'
  //     ? this.updateClientUseCase.execute(this.idClient, client)
  //     : this.createClientUseCase.execute(client);
  
  //   useCase.pipe(
  //     tap(() => this.router.navigate(['clientes']))
  //   ).subscribe({
  //     error: (err) => console.error('Error durante la operación', err),
  //   });
  // }

  handleSubmit(client: IClient) {
    if (this.action === 'update') {
      this.updateClientUseCase.execute(this.idClient, client).subscribe({
        next: () => this.router.navigate(['clientes']),
        error: (err) => console.error('Error al actualizar el cliente', err),
      });
    } else {
      this.createClientUseCase.execute(client).subscribe({
        next: () => this.router.navigate(['clientes']),
        error: (err) => console.error('Error al registrar el cliente', err),
      });
    }
  }
  
  

}
