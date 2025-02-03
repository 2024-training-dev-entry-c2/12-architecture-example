import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPedido } from '../../../../domain/model/pedido.model';

@Component({
  selector: 'lib-pedido-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.scss'
})
export class PedidoFormComponent {
  private formBuilder = inject(FormBuilder);
  public pedidoSelected = input<IPedido>();
  public buttonSubmitClick = output<IPedido>();

  public pedidoForm = this.formBuilder.group({
    id: -1,
    precio: [0, [Validators.required]],
    idCliente: [0, [Validators.required]],
  });
  submit(): void {
    if (this.isSelected()) {
      const formValues = this.pedidoForm.getRawValue();
      const pedidoSelected = this.pedidoSelected();

      this.pedidoForm.patchValue({
        id: pedidoSelected?.id,
        precio: formValues.precio || pedidoSelected?.precio,
        idCliente: formValues.idCliente || pedidoSelected?.idCliente,
      });
    }

    if (this.pedidoForm.valid) {
      this.buttonSubmitClick.emit(
        this.pedidoForm.getRawValue() as unknown as IPedido
      );
    }
  }

  isSelected() {
    return this.pedidoSelected()?.idCliente == 0 &&
      this.pedidoSelected()?.precio == 0
      ? false
      : true;
  }
}
