import { Component, inject, input, output, viewChild } from '@angular/core';
import { ButtonComponent } from "shared";
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ModalComponent } from "shared";
import { AddOrdenFormComponent } from "../../forms/add-orden-form/add-orden-form.component";
import { OrdenState } from '../../../../domain/state/orden.state';
import { ICreateOrden } from '../../../../domain/model/create-orden.model';


@Component({
  selector: 'lib-get-ordenes',
  imports: [ButtonComponent, CurrencyPipe, ModalComponent, AddOrdenFormComponent],
  templateUrl: './get-ordenes.component.html',
  styleUrl: './get-ordenes.component.scss'
})
export class GetOrdenesComponent {
  private readonly ordenState = inject(OrdenState);
  public ordenes = input.required<ICreateOrden[]>();
  public currentOrden = input<ICreateOrden>();
  public modal = viewChild<ModalComponent>('modal');
  public onSelectOrden = output<number>();
  public onCreateOrden = output<{orden: ICreateOrden; modal: ModalComponent}>();
  public onDeleteOrden = output<number>();
  public onStatusChange = output<ICreateOrden>();
  message(): string {
    return this.ordenState.store().successMessage.snapshot();
  }

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
  statusChange(orden: ICreateOrden) {
    const nextStatus = this.getNextStatus(orden.statusOrder);
    const updatedOrden = { ...orden, statusOrder: nextStatus };
    this.onStatusChange.emit(updatedOrden);
  }

  getNextStatus(currentStatus: string): string {
    const statusOptions = ['PENDING', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED', 'DELIVERED'];
    const currentIndex = statusOptions.indexOf(currentStatus);
    return statusOptions[(currentIndex + 1) % statusOptions.length];
  }
  handleSubmit(orden: ICreateOrden) {
      this.onCreateOrden.emit({orden, modal: this.modal()});
   }
   editOrden(id: number) {
    this.onSelectOrden.emit(id);
    this.modal().toggle();
  }
  deleteOrden(id: number){
    this.onDeleteOrden.emit(id);
  }
}
