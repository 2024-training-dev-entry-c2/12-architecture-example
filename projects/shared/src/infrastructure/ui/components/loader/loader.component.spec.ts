import { TestBed } from "@angular/core/testing";
import { LoaderComponent } from "./loader.component";

describe('LoaderComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LoaderComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(LoaderComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should not render the loader initially', () => {
        const fixture = TestBed.createComponent(LoaderComponent);
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.load-container')).toBeFalsy();
    });
  
    it('should render loader when emits true', () => {
        const fixture = TestBed.createComponent(LoaderComponent);
        const compiled = fixture.nativeElement as HTMLElement;
        const component = fixture.componentInstance;
        component.isVisible = true;
        fixture.detectChanges();

        expect(compiled.querySelector('i')).toBeTruthy();
    });

});