import { TestBed } from "@angular/core/testing";
import { ModalComponent } from "./modal.component";
import { IModal } from "../../interfaces";
import { BadgeComponent } from "../badge/badge.component";

describe('ModalComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(ModalComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the provided component in the ngComponentOutlet', () => {
      const fixture = TestBed.createComponent(ModalComponent);
      const compiled = fixture.nativeElement as HTMLElement;

      const modalData: IModal = {
          title: 'title',
          component: BadgeComponent,
          componentInputs: {
            data :{
                type: 'badge',
                value: 'value',
            }
          },
      };
  
      fixture.componentRef.setInput('modalData', modalData);
      fixture.detectChanges();
  
      const badgeElement = compiled.querySelector('app-badge');
      
      expect(badgeElement).toBeTruthy();
  
    });

});