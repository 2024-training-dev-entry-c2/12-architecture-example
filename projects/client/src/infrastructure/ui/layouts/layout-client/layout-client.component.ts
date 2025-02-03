import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'lib-layout-client',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout-client.component.html',
  styleUrl: './layout-client.component.scss'
})
export class LayoutClientComponent {
  options = [{
    url: "agregar",
    name: "Agregar"
  },
  {
    url: "buscar",
    name: "Buscar"
  }
  ]
}
