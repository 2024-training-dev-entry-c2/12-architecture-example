import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss',
})
export class MenuFormComponent {
  private formBuilder = inject(FormBuilder);
  public menuSelected = input<IMenu>();
  public buttonSubmitClick = output<IMenu>();
  public inputValue: string = '';

  public menuForm = this.formBuilder.group({
    id: -1,
    nombre: ['', [Validators.required]],
    urlImage: ['', [Validators.required]],
  });

  submit(): void {
    if (this.isSelected()) {
      const formValues = this.menuForm.getRawValue();
      const menuSelected = this.menuSelected();

      this.menuForm.patchValue({
        id: menuSelected?.id,
        nombre: formValues.nombre || menuSelected?.nombre || '',
        urlImage: formValues.urlImage || menuSelected?.urlImage || '',
      });
    }

    if (this.menuForm.valid) {
      this.buttonSubmitClick.emit(
        this.menuForm.getRawValue() as unknown as IMenu
      );
    }
  }

  isSelected() {
    return this.menuSelected()?.nombre == '' &&
      this.menuSelected()?.urlImage == ''
      ? false
      : true;
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
  }
}
