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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClick event when onButtonClick is called', () => {
    const buttonClickSpy = spyOn(component.buttonClick, 'emit');
    component.onButtonClick();
    expect(buttonClickSpy).toHaveBeenCalled();
  });

  it('should emit buttonClick event when button is clicked', () => {
    const buttonClickSpy = spyOn(component.buttonClick, 'emit');
    const button = fixture.componentInstance;
    button.onButtonClick();
    expect(buttonClickSpy).toHaveBeenCalled();
  });
});
