import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { IToast } from '../../containers/toast-container/toast-container.component';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and message', () => {
    const mockToast: IToast = {
      type: 'success',
      title: 'Success!',
      message: 'The operation was successful.',
      duration: 2000,
      close: true

    };


    fixture.componentRef.setInput('toastData', mockToast);
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('.toasttitle')
    ).nativeElement;
    const messageElement = fixture.debugElement.query(
      By.css('.toast__description')
    ).nativeElement;

    expect(titleElement.textContent).toBe(mockToast.title);
    expect(messageElement.textContent).toBe(mockToast.message);
  });

  it('should apply the correct class based on the toast type', () => {
    const mockToast: IToast = {
      type: 'error',
      title: 'Error!',
      message: 'Something went wrong.',
      duration: 2000,
      close: true
    };

    fixture.componentRef.setInput('toastData', mockToast);

    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(
      By.css('.toast')
    ).nativeElement;
    expect(toastElement.classList).toContain('toast--error');
  });

  it('should toggle visibility based on the "show" input', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    let toastElement = fixture.debugElement.query(
      By.css('.toast')
    ).nativeElement;
    expect(toastElement.classList).toContain('toast--show');

    fixture.componentRef.setInput('show', false);

    fixture.detectChanges();

    toastElement = fixture.debugElement.query(By.css('.toast')).nativeElement;
    expect(toastElement.classList).not.toContain('toast--show');
  });
});
