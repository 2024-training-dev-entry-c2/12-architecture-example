import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  output,
} from '@angular/core';
import { Iorder } from '../../../../domain/model/orders.model';
import { Idish } from 'dish';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iclient } from 'clients';

@Component({
  selector: 'lib-form-orders',
  imports: [ReactiveFormsModule],
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOrdersComponent {
  private readonly _fb = inject(FormBuilder);
  public onSubmit = output<Iorder>();
  @Input() dishes: Idish[] = [];
  @Input() users: Iclient[] = [];

  @Input()
  set orders(value: any) {
    this.form.patchValue(value);
  }
  public form = this._fb.group({
    date: ['', Validators.required],
    total: [0, Validators.required],
    user: [[], Validators.required],
    dish: [[], Validators.required],
    quantity: [0, Validators.required],
    id: [null],
  });

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
    this.form.reset();
  }
}
