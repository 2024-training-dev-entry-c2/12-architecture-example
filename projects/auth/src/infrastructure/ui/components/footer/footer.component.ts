import { Component } from '@angular/core';
import { SocialButtonComponent } from "./social-button/social-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-footer',
  imports: [SocialButtonComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialLinks = [
    { platform: 'facebook', link: 'https://www.facebook.com/srdelsalto' },
    { platform: 'twitter', link: 'https://www.twitter.com/santyrdse' },
    { platform: 'linkedin', link: 'https://www.linkedin.com/in/srdelsalto' },
    { platform: 'instagram', link: 'https://www.instagram.com/santyrdse' }
  ];
  currentYear = new Date().getFullYear();
}