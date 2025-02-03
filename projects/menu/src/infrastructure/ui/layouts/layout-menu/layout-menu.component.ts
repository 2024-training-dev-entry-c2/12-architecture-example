import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'lib-layout-menu',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-menu.component.html',
  styleUrl: './layout-menu.component.scss'
})
export class LayoutMenuComponent {
  options = [{
    url: "agregar",
    name: "agregar"
  },
  {
    url: "buscar",
    name: "buscar"
  }
  ]
}
