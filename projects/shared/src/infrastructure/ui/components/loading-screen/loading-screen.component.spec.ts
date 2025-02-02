import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingScreenComponent } from './loading-screen.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

describe('LoadingScreenComponent', () => {
  let component: LoadingScreenComponent;
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let loadingOverlay: HTMLElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreenComponent, SpinnerComponent, FontAwesomeModule],
    })
      .overrideComponent(LoadingScreenComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the loading overlay if isLoading is false', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();
    loadingOverlay = fixture.nativeElement.querySelector('.loading-overlay');
    expect(loadingOverlay).toBeNull();
  });

  it('should render the loading overlay if isLoading is true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    loadingOverlay = fixture.nativeElement.querySelector('.loading-overlay');
    expect(loadingOverlay).toBeTruthy();
  });
});