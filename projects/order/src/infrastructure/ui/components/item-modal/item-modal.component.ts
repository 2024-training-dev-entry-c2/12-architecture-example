import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrderItem } from '../../../../domain/model/orders.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-item-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-modal.component.html',
  styleUrl: './item-modal.component.scss'
})
export class ItemModalComponent implements OnInit{
  @Input() isVisible: boolean = false;
  @Input() item: IOrderItem | null = null;
  @Input() isEditMode: boolean = false;
  @Input() modalTitle: string = '';
  @Input() modalButton: string = 'Agregar';
  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter<IOrderItem>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idDish: [this.item ? this.item.idDish : null, [Validators.required, Validators.min(1)]],
      quantity: [this.item ? this.item.quantity : 1, [Validators.required, Validators.min(1)]]
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const orderItem: IOrderItem = this.form.value;
      this.submit.emit(orderItem);
      this.closeModal();
    }
  }
}
