import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDish } from '../../../domain/model/menu.model';

@Component({
  selector: 'lib-add-dish',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.scss'
})
export class AddDishComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IDish>();

  public dishForm = this.formBuilder.group({
    id:[null],
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    menuRestaurantId:[1, Validators.required]
    });

    submit(): void {
      if (!this.dishForm.valid) return
      this.onSubmit.emit(this.dishForm.getRawValue());

    }
}
