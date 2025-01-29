import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideLayoutComponent } from "../aside-layout/aside-layout.component";

@Component({
  selector: 'lib-main-layout',
  imports: [RouterOutlet, AsideLayoutComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  
}
