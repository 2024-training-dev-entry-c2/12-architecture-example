import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message correctly', () => {
    component.message = 'Test Alert Message';
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector('.alert__title');
    expect(messageElement.textContent).toContain(
      'Test Alert Message'
    );
  });

  it('should emit the close event when the close button is clicked', () => {
    const closeSpy = spyOn(component.close, 'emit');
    const closeButton = fixture.debugElement.query(
      By.css('.alert__close-button')
    );

    closeButton.nativeElement.click();
    expect(closeSpy).toHaveBeenCalled();
  });
});
