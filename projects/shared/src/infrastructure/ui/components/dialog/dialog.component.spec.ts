import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let toastElement: HTMLDivElement;
  let toastMessage: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent, CommonModule],
    })
      .overrideComponent(DialogComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    toastElement = fixture.nativeElement.querySelector('.toast');
    toastMessage = fixture.nativeElement.querySelector('.toast__message');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message from input', () => {
    fixture.componentRef.setInput('message', 'This is a test message');
    fixture.detectChanges();
    expect(toastMessage.textContent).toContain('This is a test message');
  });

  it('should apply the correct CSS class based on input type', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    expect(toastElement.classList).toContain('toast--success');

    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(toastElement.classList).toContain('toast--error');
  });

  it('should emit hideDialog event after 4 seconds', fakeAsync(() => {
    let emitted = false;
    component.hideDialog.subscribe(() => {
      emitted = true;
    });
    component.ngOnInit();
    tick(4000);
    expect(emitted).toBeTrue();
  }));
});
