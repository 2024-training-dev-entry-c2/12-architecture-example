import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

interface Link {
  name: string;
  link: string;
  icon: IconDefinition;
}

@Component({
  selector: 'lib-sidebar',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  faUsers = faUsers;
  
  links: Link[] = [
    {
      name: 'Admins',
      link: '/admins',
      icon: faUsers,
    },
  ];
}
