import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetOrdenesComponent } from "../../components/get-ordenes/get-ordenes.component";
import { GetOrdenesUsecase } from '../../../../application/useCase/get-ordenes.usecase';
import { Observable } from 'rxjs';
import { IViewOrden } from '../../../../domain/model/orden.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-ordenes-container',
  imports: [GetOrdenesComponent, AsyncPipe],
  templateUrl: './ordenes-container.component.html',
})
export class OrdenesContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetOrdenesUsecase);
  public ordenes$: Observable<IViewOrden[]>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.ordenes$ = this._getUseCase.ordenes$();
    console.log("container", this._getUseCase.ordenes$())
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
  }


}
