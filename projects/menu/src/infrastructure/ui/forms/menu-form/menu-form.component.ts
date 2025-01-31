import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menus.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent {
  private readonly fb = inject(FormBuilder);

  public form: FormGroup = this.fb.group({
    menuName: ['', Validators.required],
    dishes: [[]]
  });

  getFormData(): IMenu | null {
    if (!this.form.valid) {
      return null;
    }
    const formData = this.form.getRawValue();
    if (!formData.dishes) {
      formData.dishes = [];
    }
    return formData;
  }
  
  resetForm(): void {
    this.form.reset();
  }
}
