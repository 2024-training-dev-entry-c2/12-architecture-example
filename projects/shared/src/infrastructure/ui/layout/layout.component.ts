import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../components/loader/loader.component';
import { ToastComponent } from '../components/toast/toast.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet, LoaderComponent, ToastComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
