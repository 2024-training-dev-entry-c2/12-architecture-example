import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavbarComponent } from 'shared';

@Component({
  selector: 'lib-home-layout',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {}
