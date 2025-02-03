import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDish } from '../../../../domain/model/menus.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-dish-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dish-modal.component.html',
  styleUrl: './dish-modal.component.scss'
})
export class DishModalComponent {
  @Input() isVisible: boolean = false;
  @Input() dish: IDish | null = null;
  @Input() isEditMode: boolean = false;
  @Input() modalTitle: string = '';
  @Input() modalButton: string = 'Agregar';
  @Output() close = new EventEmitter();
  @Output() submit = new EventEmitter<IDish>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dishName: [this.dish ? this.dish.dishName : '', [Validators.required]],
      price: [this.dish ? this.dish.price : null, [Validators.required, Validators.min(0)]],
      description: [this.dish ? this.dish.description : '', [Validators.required]]
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dish: IDish = this.form.value;
      this.submit.emit(dish); 
      this.closeModal();
    }
  }
}
