import { Component, input, output } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { IPlato } from '../../../../domain/model/platos.model';
import { PaltoFormComponent } from "../../forms/palto-form/palto-form.component";

@Component({
  selector: 'lib-plato-component',
  imports: [CardComponent, PaltoFormComponent],
  templateUrl: './plato-component.component.html',
  styleUrl: './plato-component.component.scss'
})
export class PlatoComponentComponent {
  public platos = input.required<IPlato[]>();
  public buttonSubmitClick = output<IPlato>();
  public selectedToUpdate = output<IPlato>();
  public selectedToDelete = output<number>();
  public selected = input<IPlato>();

  deleteMenu(id: number) {
    this.selectedToDelete.emit(id);
  }

  selectMenuToUpdate(plato: IPlato) {
    this.selectedToUpdate.emit(plato);
  }

  handleSubmit(plato: IPlato) {
    this.buttonSubmitClick.emit(plato);
  }
}
