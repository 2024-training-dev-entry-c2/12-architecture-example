import { Component, input, output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { CardComponent } from '../card/card.component';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';

@Component({
  selector: 'lib-list-menu',
  imports: [CardComponent, MenuFormComponent],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.scss',
})
export class ListMenuComponent {
  public menu = input.required<IMenu[]>();
  public buttonSubmitClick = output<IMenu>();
  public menuSelectedToUpdate = output<IMenu>();
  public menuSelectedToDelete = output<number>();
  public menuSelected = input<IMenu>();

  deleteMenu(id: number) {
    this.menuSelectedToDelete.emit(id);
  }

  selectMenuToUpdate(menu: IMenu) {
    this.menuSelectedToUpdate.emit(menu);
  }

  handleSubmit(menu: IMenu) {
    this.buttonSubmitClick.emit(menu);
  }
}
