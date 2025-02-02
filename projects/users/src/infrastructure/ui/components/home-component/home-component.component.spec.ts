import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponentComponent } from './home-component.component';
import { By } from '@angular/platform-browser';

describe('HomeComponentComponent', () => {
    let component: HomeComponentComponent;
    let fixture: ComponentFixture<HomeComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HomeComponentComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a container with 100vh height', () => {
        const containerElement = fixture.debugElement.query(By.css('.container'));
         expect(containerElement.nativeElement.offsetHeight).toBe(window.innerHeight)
  });

  it('should render the ng-content',async () => {
        const contentText = 'This is the home content';
        fixture.nativeElement.querySelector('.container').innerHTML = `<lib-home-component>${contentText}</lib-home-component>`; 
        await fixture.whenStable(); 
        fixture.detectChanges();


        const content = fixture.debugElement.query(By.css('.container'));
        const renderedContent = content?.nativeElement.textContent;
        expect(renderedContent).toContain(contentText);
  });
});