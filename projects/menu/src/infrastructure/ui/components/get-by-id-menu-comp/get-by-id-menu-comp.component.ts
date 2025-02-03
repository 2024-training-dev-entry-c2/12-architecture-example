import { Component,Input } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'lib-get-by-id-menu-comp',
  imports: [CurrencyPipe],
  templateUrl: './get-by-id-menu-comp.component.html',
  styleUrl: './get-by-id-menu-comp.component.scss'
})
export class GetByIdMenuCompComponent {
  @Input() menu!: IMenu;
}
