import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cardData = input<ICard>();
  componentOutputs:  { [key: string]: (event: any) => void } = {};

}