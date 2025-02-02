import { Component, inject, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../../domain/model/dish.model';

@Component({
  selector: 'lib-form-dish',
  imports: [ReactiveFormsModule],
  templateUrl: './form-dish.component.html',
  styleUrl: './form-dish.component.scss'
})
export class FormDishComponent implements OnChanges {
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  @Input() title: string = '';
  @Input() action: string = '';
  @Input() dish: IDish | null = null;

  @Output() onSubmit = new EventEmitter<IDish>();

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    idMenu: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dish']?.currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.dish) {
      this.form.patchValue(this.dish);
      this.cdr.detectChanges();
    }
  }

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
