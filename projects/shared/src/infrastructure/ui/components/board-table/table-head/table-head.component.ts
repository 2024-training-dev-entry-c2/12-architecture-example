import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-table-head',
  imports: [],
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.scss'
})
export class TableHeadComponent {
  public titles = input<string[]>();
}
