import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../../domain/model/dishes.model';
import { ListMenusUseCase } from 'menu';
import { IMenu } from 'menu';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent {
  private readonly fb = inject(FormBuilder);

  @Input() isEditForm: boolean = false;
  @Input() currentDishName: string = '';
  @Input() currentPrice: number = 0;
  @Input() currentDescription: string = '';
  @Input() isPopular: boolean = false; 
  @Input() menus: IMenu[] = []; 

  public form: FormGroup = this.fb.group({
    dishName: [this.currentDishName, [Validators.required]],
    price: [this.currentPrice, [Validators.required]],
    description: [this.currentDescription, [Validators.required]],
    idMenu: [null, [Validators.required]]
  });

  getFormData(): IDish {
    return this.form.value;
  }

  resetForm(): void {
    this.form.reset();
  }
}
