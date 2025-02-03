import { TestBed } from "@angular/core/testing";
import { BadgeComponent } from "./badge.component";

describe('BadgeComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BadgeComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(BadgeComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  
    it('should render span', () => {
      const fixture = TestBed.createComponent(BadgeComponent);
      const compiled = fixture.nativeElement as HTMLElement;
  
      expect(compiled.querySelector('span')).toBeTruthy();
    });

});