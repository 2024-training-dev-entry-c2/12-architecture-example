import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should to set correct values in the inputs', () => {
    component.icon = '#test-icon';
    component.buttonIndex = 1;
    component.rowIndex = 2;
    component.ariaLabel = 'test-aria-label';
    fixture.detectChanges();
    expect(component.icon).toBe('#test-icon');
    expect(component.buttonIndex).toBe(1);
    expect(component.rowIndex).toBe(2);
    expect(component.ariaLabel).toBe('test-aria-label');
  });
  it('should emit buttonClick event when button is clicked', () => {
    spyOn(component.buttonClick, 'emit');
    component.rowIndex = 2;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalledWith(2);
  });
});
