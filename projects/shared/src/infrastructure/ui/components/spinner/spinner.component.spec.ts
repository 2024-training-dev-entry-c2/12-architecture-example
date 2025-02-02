import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerIcon: HTMLElement;
  let loadingText: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent, FontAwesomeModule],
    })
      .overrideComponent(SpinnerComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerIcon = fixture.nativeElement.querySelector('fa-icon');
    loadingText = fixture.nativeElement.querySelector('p');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the spinner icon with correct properties', () => {
    expect(spinnerIcon).toBeTruthy();
    expect(spinnerIcon.getAttribute('ng-reflect-size')).toBe('4x');
    expect(spinnerIcon.getAttribute('ng-reflect-animation')).toBe('spin');
  });

  it('should render the loading text', () => {
    expect(loadingText).toBeTruthy();
    expect(loadingText.textContent).toContain('Loading...');
  });
});
