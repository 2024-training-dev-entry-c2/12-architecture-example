import { Component, input, output } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-component',
  imports: [CardComponent, ClientFormComponent],
  templateUrl: './client-component.component.html',
  styleUrl: './client-component.component.scss',
})
export class ClientComponentComponent {
  public clients = input.required<IClient[]>();
  public buttonSubmitClick = output<IClient>();
  public selectedToUpdate = output<IClient>();
  public selectedToDelete = output<number>();
  public clientSelected = input<IClient>();

  delete(id: number) {
    this.selectedToDelete.emit(id);
  }

  selectToUpdate(menu: IClient) {
    this.selectedToUpdate.emit(menu);
  }

  handleSubmit(menu: IClient) {
    this.buttonSubmitClick.emit(menu);
  }
}
