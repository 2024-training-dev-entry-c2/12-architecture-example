import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'shared';
import { NavbarComponent } from 'shared';

@Component({
  selector: 'lib-customer-layout',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent {}
