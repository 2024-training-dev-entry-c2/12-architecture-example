import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Button');
    fixture.detectChanges();
  });

  it('should update text when input changes', () => {
    fixture.componentRef.setInput('text', 'New Text');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toBe('New Text');
  });

  it('should have primary theme by default', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('button--primary')).toBeTruthy();
  });

  it('should update theme when input changes', () => {
    fixture.componentRef.setInput('theme', 'danger');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('button--danger')).toBeTruthy();
  });

  it('should apply info theme when provided', () => {
    fixture.componentRef.setInput('theme', 'info');
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('button--info')).toBeTruthy();
  });

  it('should emit onClick event when clicked', () => {
    let clicked = false;
    component.onClick.subscribe(() => (clicked = true));

    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(clicked).toBeTruthy();
  });
});
