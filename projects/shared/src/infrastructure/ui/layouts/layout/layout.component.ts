import {  Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BoxComponent } from '../../components/box/box.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-layout',
  imports: [HeaderComponent, BoxComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent { }
