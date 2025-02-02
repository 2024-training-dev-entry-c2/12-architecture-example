import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from '../../../service/alert.service';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [AlertService]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have correct ARIA attributes', () => {
    const container = fixture.nativeElement.querySelector('.alert-container');
    expect(container.getAttribute('role')).toBe('alert');
    expect(container.getAttribute('aria-live')).toBe('polite');
  });
});