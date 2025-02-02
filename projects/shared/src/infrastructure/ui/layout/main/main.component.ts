import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-main',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
