import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-slide',
  imports: [],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {
  public images = [
    {
      src: 'https://plus.unsplash.com/premium_photo-1687089577054-d5ea57d4ceeb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Plato Frijoles',
    },
    {
      src: 'https://images.unsplash.com/photo-1622532631316-5f8afb40812f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Casuela fija',
    },
    {
      src: 'https://images.unsplash.com/photo-1652690772760-cafa7a656807?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Sopa de pollo',
    },
  ];
  public imagesBebidas = [
    {
      src: 'https://images.unsplash.com/photo-1522427088495-81d38b91befb?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Agua',
    },
    {
      src: 'https://images.unsplash.com/photo-1713517681904-9f5979261e92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Coca-cola',
    },
    {
      src: 'https://images.unsplash.com/photo-1695804567985-ed97d5b1f031?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Cerveza',
    },
  ];
}
