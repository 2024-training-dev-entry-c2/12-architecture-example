import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'lib-main-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  public isAnimating = false;

  animateTransition(): void {
    this.isAnimating = true;

    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }
}
