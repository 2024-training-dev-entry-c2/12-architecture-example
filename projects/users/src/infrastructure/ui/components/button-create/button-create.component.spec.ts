import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateComponent } from './button-create.component';
import { By } from '@angular/platform-browser';

describe('ButtonCreateComponent', () => {
  let component: ButtonCreateComponent;
  let fixture: ComponentFixture<ButtonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the action function when the button is clicked', () => {
    const actionSpy = spyOn(component, 'action');
    const button = fixture.debugElement.query(
      By.css('.users__register-button')
    );
    button.nativeElement.click();
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should have the correct CSS classes on elements', () => {
    const usersDiv = fixture.debugElement.query(By.css('.users'));
    const titleElement = fixture.debugElement.query(By.css('.users__title'));
    const registerContainer = fixture.debugElement.query(By.css('.users__register-container'));
    const registerText = fixture.debugElement.query(By.css('.users__register-text'));
    const registerButton = fixture.debugElement.query(By.css('.users__register-button'));
    const buttonIcon = fixture.debugElement.query(By.css('.users__register-button-icon'));
    const buttonText = fixture.debugElement.query(By.css('.users__register-button-text'));

    expect(usersDiv).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(registerContainer).toBeTruthy();
    expect(registerText).toBeTruthy();
    expect(registerButton).toBeTruthy();
    expect(buttonIcon).toBeTruthy();
    expect(buttonText).toBeTruthy();

  });
});
