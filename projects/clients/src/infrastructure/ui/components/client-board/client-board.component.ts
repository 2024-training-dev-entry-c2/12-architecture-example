import { Component, input, output } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';
import { TitleCasePipe } from '@angular/common';
import { CellOptionsComponent } from 'shared';
import { BooleanPipe } from '../../pipes/boolean.pipe';

@Component({
  selector: 'lib-client-board',
  imports: [CellOptionsComponent ,TitleCasePipe, BooleanPipe],
  templateUrl: './client-board.component.html',
  styleUrl: './client-board.component.scss'
})
export class ClientBoardComponent {
  titles = ['nombre', 'correo electrónico', '¿es frecuente?']
  clients = input.required<IClient[]>();
  onSelectClientToUpdate = output<number>();
  onSelectClientToDelete = output<number>();

  handleSelectUpdate(id: number){
    this.onSelectClientToUpdate.emit(id);
  }

  handleSelectDelete(id: number){
    this.onSelectClientToDelete.emit(id);
  }
}
