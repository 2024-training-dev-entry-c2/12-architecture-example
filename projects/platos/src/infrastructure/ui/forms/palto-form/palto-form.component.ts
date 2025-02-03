import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPlato } from '../../../../domain/model/platos.model';

@Component({
  selector: 'lib-palto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './palto-form.component.html',
  styleUrl: './palto-form.component.scss'
})
export class PaltoFormComponent {
  private formBuilder = inject(FormBuilder);
  public platoSelected = input<IPlato>();
  public buttonSubmitClick = output<IPlato>();
  public inputValue: string = '';

  public platoForm = this.formBuilder.group({
    id: -1,
    nombre: ['', [Validators.required]],
    idmenu: [0, [Validators.required]],
    precio: [0, [Validators.required]],
    urlImage: ['', [Validators.required]],
    tipoPlato: '',
  });

  submit(): void {
    if (this.isSelected()) {
      const formValues = this.platoForm.getRawValue();
      const platoSelected = this.platoSelected();

      this.platoForm.patchValue({
        id: platoSelected?.id,
        nombre: formValues.nombre || platoSelected?.nombre || '',
        urlImage: formValues.urlImage || platoSelected?.urlImage || '',
        precio: formValues.precio || platoSelected?.precio || 0,
        idmenu: formValues.idmenu || platoSelected?.idmenu || null,
        tipoPlato: formValues.tipoPlato || platoSelected?.tipoPlato || null,
      });
    }

    if (this.platoForm.valid) {
      this.buttonSubmitClick.emit(
        this.platoForm.getRawValue() as unknown as IPlato
      );
      this.inputValue = ''
    }
  }

  isSelected() {
    return this.platoSelected()?.nombre == '' &&
      this.platoSelected()?.idmenu == null &&
      this.platoSelected()?.urlImage == '' &&
      this.platoSelected()?.precio == 0
      ? false
      : true;
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
  }
}
