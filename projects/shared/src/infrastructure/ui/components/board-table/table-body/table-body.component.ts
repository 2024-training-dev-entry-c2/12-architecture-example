import { Component, input } from '@angular/core';
import { CellOptionsComponent } from './cell-options/cell-options.component';

@Component({
  selector: 'lib-table-body',
  imports: [CellOptionsComponent],
  templateUrl: './table-body.component.html',
  styleUrl: './table-body.component.scss'
})
export class TableBodyComponent {
  public columns = input<string[][]>();
  public hasOptions = input<boolean>(true);
}
