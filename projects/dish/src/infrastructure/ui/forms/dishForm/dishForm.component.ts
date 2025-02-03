import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  output,
} from '@angular/core';
import { Idish } from '../../../../domain/model/dish.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dishForm.component.html',
  styleUrl: './dishForm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishFormComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<Idish>();

  @Input() set dishes(value: Idish) {
    this.formDish.patchValue(value);
  }

  public formDish = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],

    id: [null],
    isPopular: [false, Validators.required],
  });

  submit() {
    if (!this.formDish.valid) return;
    this.onSubmit.emit(this.formDish.getRawValue());
    console.log("Funciona desde el form", this.formDish.value);

    this.formDish.reset();
  }
}
