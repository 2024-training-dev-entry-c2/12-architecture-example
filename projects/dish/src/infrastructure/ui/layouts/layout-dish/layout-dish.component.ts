import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'lib-layout-dish',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-dish.component.html',
  styleUrl: './layout-dish.component.scss'
})
export class LayoutDishComponent {
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
