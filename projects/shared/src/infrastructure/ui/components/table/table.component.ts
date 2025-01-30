import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';
import { IColumn } from '../../../../domain/model/column.model';

@Component({
  selector: 'lib-table',
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public title = input<string>();
  public data = input<any[]>();
  public columns = input<IColumn[]>();
}
