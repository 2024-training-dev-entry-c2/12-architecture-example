import { Component, inject, input, output, viewChild } from '@angular/core';
import { ButtonComponent } from "shared";
import { IViewOrden } from '../../../../domain/model/orden.model';
import { CurrencyPipe } from '@angular/common';
import { ModalComponent } from "shared";
import { AddOrdenFormComponent } from "../../forms/add-orden-form/add-orden-form.component";
import { OrdenState } from '../../../../domain/state/orden.state';

@Component({
  selector: 'lib-get-ordenes',
  imports: [ButtonComponent, CurrencyPipe, ModalComponent, AddOrdenFormComponent],
  templateUrl: './get-ordenes.component.html',
  styleUrl: './get-ordenes.component.scss'
})
export class GetOrdenesComponent {
  private readonly ordenState = inject(OrdenState);
  public ordenes = input.required<IViewOrden[]>();
  public modal = viewChild<ModalComponent>('modal');
  public onSubmit = output<IViewOrden>();
  public onSelection = output<string>();
  message(): string {
    return this.ordenState.store().successMessage.snapshot();
  }
  statusOptions = [
    'PENDING',
    'IN_PREPARATION',
    'COMPLETED',
    'CANCELLED',
    'DELIVERED',
  ];
  statusClassMap: Map<string, string> = new Map([
    ['PENDING', 'content__btn-pending'],
    ['IN_PREPARATION', 'content__btn-in-preparation'],
    ['COMPLETED', 'content__btn-completed'],
    ['CANCELLED', 'content__btn-cancelled'],
    ['DELIVERED', 'content__btn-delivered'],
  ]);
  getButtonClass(status: string): string {
    return this.statusClassMap.get(status) || '';
  }
  handleSubmit(orden: IViewOrden){
    this.onSubmit.emit(orden);
  }

}
