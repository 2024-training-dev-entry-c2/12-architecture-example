import { TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";

describe('ButtonComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ButtonComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(ButtonComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  
    it('should render button', () => {
      const fixture = TestBed.createComponent(ButtonComponent);
      const compiled = fixture.nativeElement as HTMLElement;
  
      expect(compiled.querySelector('button')).toBeTruthy();
    });

    it('should be called onClick', () => {
        const fixture = TestBed.createComponent(ButtonComponent);
        const component = fixture.componentInstance;
        const compiled = fixture.nativeElement as HTMLElement;
        const buttonElement = compiled.querySelector('button');
        spyOn(component.clickEvent, 'emit');
    
        buttonElement.click();
        
        expect(component.clickEvent.emit).toHaveBeenCalled();
    });

});