import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsSectionComponent } from "../../components/clients-section/clients-section.component";
import { Observable } from 'rxjs';
import { ListClientsUsecase } from '../../../../application/clients/list-clients.usecase';
import { AsyncPipe } from '@angular/common';
import { IClient } from '../../../../domain/model/client.model';
import { CreateClientUsecase } from '../../../../application/clients/create-client.usecase';
import { ModalComponent } from 'shared';
import { UpdateClientUsecase } from '../../../../application/clients/update-client.usecase';
import { DeleteClientUsecase } from '../../../../application/clients/delete-client.usecase';

@Component({
  selector: 'lib-clients-container',
  imports: [ClientsSectionComponent, AsyncPipe],
  templateUrl: './clients-container.component.html'
})
export class ClientsContainerComponent implements OnInit, OnDestroy{
  public clients$: Observable<IClient[]>;
  public currentClient$: Observable<IClient>;
  private _listUsecase = inject(ListClientsUsecase);
  private _createUsecase = inject(CreateClientUsecase);
  private _updateUsecase = inject(UpdateClientUsecase);
  private _deleteUsecase = inject(DeleteClientUsecase);

  ngOnInit(): void {
    this.initSubscriptions();    
    this._listUsecase.execute();
    this.clients$ = this._listUsecase.clients$();
    this.currentClient$ = this._updateUsecase.currentClient$();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  handlePatchClient({client, modal}:{client: IClient; modal: ModalComponent}){
    const usecase= client.id ? this._updateUsecase : this._createUsecase;
    usecase.execute(client, modal);
  }

  handleSelectUpdateClient(id : number){
    this._updateUsecase.selectClient(id);
  }

  handleDeleteClient(id: number){
    this._deleteUsecase.execute(id);
  }

  initSubscriptions(){
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();    
    this._updateUsecase.initSubscriptions();    
    this._deleteUsecase.initSubscriptions();    
  }

  destroySubscriptions(){
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
    this._updateUsecase.destroySubscriptions();    
    this._deleteUsecase.destroySubscriptions(); 
  }
}
