import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IDishRequest } from '../../../../public-api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-create-dish-form',
  imports: [ReactiveFormsModule,ModalComponent],
  templateUrl: './create-dish-form.component.html',
  styleUrl: './create-dish-form.component.scss',
})
export class CreateDishFormComponent {
  private formadBuilder = inject(FormBuilder);
  getData: IDishRequest | any = {
    name: '',
    price: 10.0,
    isPopular: false,
  };
  @Input() getMenuid: number = 0;
  @Output() updateDish = new EventEmitter<IDishRequest>();
  public dishfoodUpdatedForm = this.formadBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [10.0, [Validators.required]],
    isPopular: [false],
    menuId: [this.getMenuid, [Validators.required]],
  });

  addDish() {
    if (this.dishfoodUpdatedForm.valid) {
      this.updateDish.emit(
        this.dishfoodUpdatedForm.getRawValue() as unknown as IDishRequest
      );
      this.dishfoodUpdatedForm.reset();
      this.redirectToDish();
    }
  }
  constructor(private router: Router) {}
  redirectToDish(): void {
    setTimeout(() => this.router.navigate(['/menu']), 500);
  }
}
