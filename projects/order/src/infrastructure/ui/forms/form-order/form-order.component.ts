import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter,inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IOrder, IDetails } from '../../../../domain/model/order.model';

@Component({
  selector: 'lib-form-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss'
})
export class FormOrderComponent implements OnChanges {
  @Input() title: string = '';
  @Input() action: string = '';
  @Input() order: IOrder | null = null;

  @Output() onSubmit = new EventEmitter<IOrder>();

  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    idCliente: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    detalles: this.formBuilder.array([]),
  });

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  private createDetalleGroup(detalle?: IDetails): FormGroup {
    return this.formBuilder.group({
      idPlato: [detalle?.idPlato ?? 0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      cantidad: [detalle?.cantidad ?? 0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  addDetalle(): void {
    this.detalles.push(this.createDetalleGroup());
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']?.currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.order) {
      this.form.patchValue({ idCliente: this.order.idCliente });
  
      this.detalles.clear();
      if (this.order.detalles && Array.isArray(this.order.detalles)) {
        this.order.detalles.forEach(detalle => {
          this.detalles.push(this.createDetalleGroup(detalle));
        });
      }
    }
  }
  
  submit() {
    if (!this.form.valid) return;

    const order: IOrder = {
      idCliente: this.form.value.idCliente!,
      detalles: this.detalles.value as IDetails[]
    };

    this.onSubmit.emit(order);
  }
}
