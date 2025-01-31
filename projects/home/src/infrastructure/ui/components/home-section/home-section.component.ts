import { Component } from '@angular/core';
import { SpinnerComponent } from 'shared';
import { HeroSectionComponent } from '../hero-section/hero-section.component';

@Component({
  selector: 'lib-home-section',
  imports: [SpinnerComponent,HeroSectionComponent],
  templateUrl: './home-section.component.html',
  styleUrl: './home-section.component.scss'
})
export class HomeSectionComponent {
  images = [
    { id: 2, src: 'assets/images/main.jpg', alt: 'Main course' },
    { id: 3, src: 'assets/images/dessert.jpg', alt: 'Dessert' },
    {
      id: 4,
      src: 'assets/images/boiled_salmon_and_salad.jpeg',
      alt: 'Gourmet starter',
    },
    {
      id: 5,
      src: 'assets/images/pasta_with_ground_beef.jpg',
      alt: 'Pasta with ground beef',
    },
    { id: 6, src: 'assets/images/pork_chops_with _salad.webp', alt: 'Pizza' },
    {
      id: 7,
      src: 'assets/images/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg',
      alt: 'Pizza',
    },
    { id: 8, src: 'assets/images/tacos_mexican.jpg', alt: 'Pizza' },
    { id: 9, src: 'assets/images/thai_salad.jpg', alt: 'Pizza' },
  ];
}
