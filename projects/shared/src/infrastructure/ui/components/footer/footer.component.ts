import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input() socialLinks: { name: string; url: string; ariaLabel: string }[] = [];

}
