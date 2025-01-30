import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-cell-options',
  imports: [RouterLink],
  templateUrl: './cell-options.component.html',
  styleUrl: './cell-options.component.scss'
})
export class CellOptionsComponent {
  public updateLink = input<string>();
  public deleteLink = input<string>();
}
