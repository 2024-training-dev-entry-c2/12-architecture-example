import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF, faTwitter, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-button',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './social-button.component.html',
  styleUrl: './social-button.component.scss'
})
export class SocialButtonComponent {
  @Input() platform: string = '';
  @Input() link: string = '';
  icon!: IconDefinition;

  ngOnInit() {
    this.icon = this.getIconByPlatform(this.platform);
  }

  getIconByPlatform(platform: string): IconDefinition {
    switch (platform) {
      case 'facebook': return faFacebookF;
      case 'twitter': return faTwitter;
      case 'linkedin': return faLinkedin;
      case 'youtube': return faYoutube;
      case 'instagram': return faInstagram;
      default: throw new Error('Icono no encontrado');
    }
  }
}
