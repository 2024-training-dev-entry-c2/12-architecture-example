import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetOrdenesComponent } from "../../components/get-ordenes/get-ordenes.component";
import { GetOrdenesUsecase } from '../../../../application/useCase/get-ordenes.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateOrdenUsecase } from '../../../../application/useCase/create-orden.usecase';
import { ICreateOrden } from '../../../../domain/model/create-orden.model';
import { ModalComponent } from 'shared';
import { UpdateOrdenUseCase } from '../../../../application/useCase/update-orden.usecase';
import { DeleteOrdenUsecase } from '../../../../application/useCase/delete-orden.usecase';
import { UpdateStatusOrdenUseCase } from '../../../../application/useCase/update-status-orden.usecase';

@Component({
  selector: 'lib-ordenes-container',
  imports: [GetOrdenesComponent, AsyncPipe],
  templateUrl: './ordenes-container.component.html',
})
export class OrdenesContainerComponent implements OnInit, OnDestroy {
   private readonly _getUseCase = inject(GetOrdenesUsecase);
   private readonly _createOrdenUseCase = inject(CreateOrdenUsecase);
   private readonly _updateOrdenUseCase = inject(UpdateOrdenUseCase);
   private readonly _deleteOrdenUseCase = inject(DeleteOrdenUsecase);
   private readonly _updateStatusOrdenUseCase = inject(UpdateStatusOrdenUseCase);
   public ordenes$: Observable<ICreateOrden[]>;
   public currentOrden$: Observable<ICreateOrden>;
   public statusOrden$ : Observable<string>;
;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.ordenes$ = this._getUseCase.ordenes$();
    this._createOrdenUseCase.initSubscriptions();
    this._updateOrdenUseCase.initSubscriptions();
    this.currentOrden$ = this._updateOrdenUseCase.currentOrden$();
    this._deleteOrdenUseCase.initSubscriptions();
    this._updateStatusOrdenUseCase.initSubscriptions();
    this.statusOrden$ = this._updateStatusOrdenUseCase.statusOrden$();
  }
  handlePatchOrden({ orden, modal }: { orden: ICreateOrden; modal: ModalComponent }) {
      const usecase = orden.id ? this._updateOrdenUseCase : this._createOrdenUseCase;
      usecase.execute(orden, modal);
    }
  handleSelectOrden(id: number){
    this._updateOrdenUseCase.selectOrden(id);
  }
  deleteOrden(id: number){
    this._deleteOrdenUseCase.execute(id);
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createOrdenUseCase.destroySubscriptions();
    this._updateOrdenUseCase.destroySubscriptions();
    this._deleteOrdenUseCase.destroySubscriptions();
  }

  getNextStatus(currentStatus: string): string {
    const statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];
    const currentIndex = statusOptions.indexOf(currentStatus);
    return statusOptions[(currentIndex + 1) % statusOptions.length];
  }
  handleStatusChange(orden: ICreateOrden): void {
    const nextStatus = this.getNextStatus(orden.statusOrder);
    const updatedOrden = { ...orden, statusOrder: nextStatus };
    this._updateStatusOrdenUseCase.execute(updatedOrden);
  }

}
