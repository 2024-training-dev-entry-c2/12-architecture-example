import { Component, Input } from '@angular/core';
import { LinkComponent } from "../../components/link/link.component";
import { Link } from '../../../../domain/model/link.interface';

@Component({
  selector: 'lib-link-container',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './link-container.component.html',
})
export class LinkContainerComponent {
  @Input() link: Link = {} as Link;
}
