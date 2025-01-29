import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavbarComponent } from '../../header/header.component';





@Component({
  selector: 'lib-main-layout',
  imports: [RouterOutlet, HeaderNavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
