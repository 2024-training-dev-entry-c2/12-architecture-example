import { TestBed } from "@angular/core/testing";
import { IToast } from "../../interfaces";
import { ToastComponent } from "./toast.component";

describe('ToastComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(ToastComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
        const fixture = TestBed.createComponent(ToastComponent);
        const compiled = fixture.nativeElement as HTMLElement;
        const component = fixture.componentInstance;
  
        const toastData: IToast = {
            title: 'title',
            message: 'message',
            type: 'info',
            duration: 1000,
            close: true
        };
        component.toastData = toastData;
        fixture.detectChanges();
    
        const pDescription = compiled.querySelector('.toast__description');
        const buttonElement = compiled.querySelector('button');

        expect(pDescription.textContent).toContain(toastData.message);
        expect(buttonElement).toBeTruthy();
      
    });

});
