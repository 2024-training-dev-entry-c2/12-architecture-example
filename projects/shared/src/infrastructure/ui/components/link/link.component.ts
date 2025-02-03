import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Link } from '../../../../domain/model/link.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-link',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  @Input() link: Link = {} as Link;
}
