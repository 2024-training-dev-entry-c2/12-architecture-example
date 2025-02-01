import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-cell-options',
  imports: [],
  templateUrl: './cell-options.component.html',
  styleUrl: './cell-options.component.scss'
})
export class CellOptionsComponent{
  public idItem = input<number>();
  public onSelectDelete = output<number>();
  public onSelectUpdate = output<number>();

  onClickUpdate(){
    this.onSelectUpdate.emit(this.idItem());
  }

  onClickDelete(){
    this.onSelectDelete.emit(this.idItem());
  }  
}
