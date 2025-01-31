import { CommonModule } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent  {
  private _fb = inject(FormBuilder);
  public onSubmit = output<IMenu>();

  @Input()
  set menu(value: IMenu | null) {
    if (value) {
      this.menuForm.patchValue(value);
    } else {
      this.menuForm.reset();
    }
  }
 
  // menuConfig = {
  //   name: 'name',
  //   label: 'Nombre del Menú',
  //   type: 'text',
  //   placeholder: 'Escribe el nuevo nombre',
  //   required: true
  // };

  public menuForm = this._fb.group({
    name: ['', Validators.required],
    id: [null],
  });

  submit() {
    if (!this.menuForm.valid) return;
    this.onSubmit.emit(this.menuForm.getRawValue());
  }
 
}
