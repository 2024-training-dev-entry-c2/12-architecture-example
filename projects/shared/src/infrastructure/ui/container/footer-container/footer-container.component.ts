import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'lib-footer-container',
  imports: [FooterComponent],
  templateUrl: './footer-container.component.html',
})
export class FooterContainerComponent {

  socialLinks = [
    { name: 'Facebook', url: '', ariaLabel: 'Visit our Facebook page' },
    { name: 'Instagram', url: '', ariaLabel: 'Visit our Instagram page' },
    { name: 'Twitter', url: '', ariaLabel: 'Visit our Twitter page' },
    { name: 'Tiktok', url: '', ariaLabel: 'Visit our Tiktok page' }
  ];

}
