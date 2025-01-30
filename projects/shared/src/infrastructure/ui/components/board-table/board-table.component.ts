import { Component } from '@angular/core';
import { TableBodyComponent } from "./table-body/table-body.component";
import { TableHeadComponent } from './table-head/table-head.component';

@Component({
  selector: 'lib-board-table',
  imports: [TableHeadComponent, TableBodyComponent],
  templateUrl: './board-table.component.html',
  styleUrl: './board-table.component.scss'
})
export class BoardTableComponent {

}
