import { TestBed } from "@angular/core/testing";
import { CardComponent } from "./card.component";
import { ICard } from "../../interfaces/card.interface";
import { BadgeComponent } from "../badge/badge.component";

describe('CardComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CardComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(CardComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the provided component in the ngComponentOutlet', () => {
      const fixture = TestBed.createComponent(CardComponent);
      const compiled = fixture.nativeElement as HTMLElement;

      const cardData: ICard = {
          component: BadgeComponent,
      };
  
      fixture.componentRef.setInput('cardData', cardData);
      fixture.detectChanges();
  
      const badgeElement = compiled.querySelector('app-badge');
      
      expect(badgeElement).toBeTruthy();
  
    });

});