import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PedidoComponentComponent } from '../../components/pedido-component/pedido-component.component';
import { IPedido } from '../../../../domain/model/pedido.model';
import { GetPedidosUseCase } from '../../../../application/get-pedidos.usecase';
import { CreatePedidoUseCase } from '../../../../application/create-pedido.usecase';
import { DeletePedidoUseCase } from '../../../../application/delete-pedido.usecase';
import { UpdatePedidoUseCase } from '../../../../application/update-pedido.usecase';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-pedido-container',
  imports: [PedidoComponentComponent, AsyncPipe],
  templateUrl: './pedido-container.component.html',
})
export class PedidoContainerComponent implements OnInit, OnDestroy {
  private readonly _getUseCase = inject(GetPedidosUseCase);
  private readonly _postUseCase = inject(CreatePedidoUseCase);
  private readonly _deleteUseCase = inject(DeletePedidoUseCase);
  private readonly _updateUseCase = inject(UpdatePedidoUseCase);

  public pedidos$: Observable<IPedido[]>;
  public currentPedido$: Observable<IPedido>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._postUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    this._getUseCase.execute();
    this.pedidos$ = this._getUseCase.pedidos$();
    this.currentPedido$ = this._updateUseCase.currentPedido$();
  }
  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._postUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }

  handleCreateOrUpdate(pedido: IPedido) {
    const usecase = pedido.id ? this._updateUseCase : this._postUseCase;
    usecase.execute(pedido);
  }

  handleSelect(pedido: IPedido) {
    this._updateUseCase.selectPedido(pedido.id);
  }

  handleDelete(id: number) {
    this._deleteUseCase.execute(id);
  }
}
