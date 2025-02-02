import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetOrdenesComponent } from "../../components/get-ordenes/get-ordenes.component";
import { GetOrdenesUsecase } from '../../../../application/useCase/get-ordenes.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CreateOrdenUsecase } from '../../../../application/useCase/create-orden.usecase';
import { ICreateOrden } from '../../../../domain/model/create-orden.model';
import { ModalComponent } from 'shared';
import { UpdateOrdenUseCase } from '../../../../application/useCase/update-orden.usecase';

@Component({
  selector: 'lib-ordenes-container',
  imports: [GetOrdenesComponent, AsyncPipe],
  templateUrl: './ordenes-container.component.html',
})
export class OrdenesContainerComponent implements OnInit, OnDestroy {
   private readonly _getUseCase = inject(GetOrdenesUsecase);
   private readonly _createOrdenUseCase = inject(CreateOrdenUsecase);
   private readonly _updateOrdenUseCase = inject(UpdateOrdenUseCase);
   public ordenes$: Observable<ICreateOrden[]>;
   public currentOrden$: Observable<ICreateOrden>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.ordenes$ = this._getUseCase.ordenes$();
    this._createOrdenUseCase.initSubscriptions();
    this._updateOrdenUseCase.initSubscriptions();
    this.currentOrden$ = this._updateOrdenUseCase.currentOrden$();

  }
  handlePatchOrden({ orden, modal }: { orden: ICreateOrden; modal: ModalComponent }) {
      const usecase = orden.id ? this._updateOrdenUseCase : this._createOrdenUseCase;
      usecase.execute(orden, modal);

    }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createOrdenUseCase.destroySubscriptions();
  }


}
