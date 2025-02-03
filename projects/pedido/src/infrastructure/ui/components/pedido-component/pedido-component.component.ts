import { Component, input, output } from '@angular/core';
import { IPedido } from '../../../../domain/model/pedido.model';
import { CardComponent } from '../card/card.component';
import { PedidoFormComponent } from "../../forms/pedido-form/pedido-form.component";

@Component({
  selector: 'lib-pedido-component',
  imports: [CardComponent, PedidoFormComponent],
  templateUrl: './pedido-component.component.html',
  styleUrl: './pedido-component.component.scss',
})
export class PedidoComponentComponent {
  public pedidos = input.required<IPedido[]>();
  public buttonSubmitClick = output<IPedido>();
  public selectedToUpdate = output<IPedido>();
  public selectedToDelete = output<number>();
  public pedidoSelected = input<IPedido>();

  delete(id: number) {
    this.selectedToDelete.emit(id);
  }

  selectToUpdate(pedido: IPedido) {
    this.selectedToUpdate.emit(pedido);
  }

  handleSubmit(pedido: IPedido) {
    this.buttonSubmitClick.emit(pedido);
  }
}
