import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormComponent } from './auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputConfig } from '../../interfaces/input-config';
/*
describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

   const mockInputs: InputConfig[] = [
        {
            type: 'text',
            label: 'Username',
            formControlName: 'username',
        },
        {
            type: 'password',
            label: 'Password',
            formControlName: 'password',
        },
       {
          type: 'select',
           label: 'Country',
          formControlName: 'country',
           options: [
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
            ],
        }
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
     component.inputsConfig = mockInputs;
     component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should display the title', () => {
        component.title = 'Test Title';
        fixture.detectChanges();
         const titleElement = fixture.debugElement.query(By.css('.auth-form__title'));
        expect(titleElement.nativeElement.textContent).toContain('Test Title');
    });

    it('should render form inputs based on inputsConfig', () => {
      const inputs = fixture.debugElement.queryAll(By.css('.auth-form__input'));
      expect(inputs.length).toBe(mockInputs.length);
      expect(inputs[0].nativeElement.getAttribute('type')).toBe('text');
      expect(inputs[1].nativeElement.getAttribute('type')).toBe('password');
       expect(inputs[2].nativeElement.tagName).toBe('SELECT');
    });
    it('should render the select options', () => {
      const selectElement = fixture.debugElement.query(By.css('select'));
       const options = selectElement.nativeElement.querySelectorAll('option');
          expect(options.length).toBe(mockInputs[2].options.length+1); 
         expect(options[1].value).toBe('us');
         expect(options[2].value).toBe('ca');
    });

    it('should render the submit button with the provided buttonText', () => {
        component.buttonText = 'Test Button';
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(By.css('.auth-form__button'));
     expect(buttonElement.nativeElement.textContent).toContain('Test Button');
    });
     it('should render the link with the provided linkText and linkRoute', () => {
        component.linkText = 'Already have an account?';
        component.linkRoute = 'Login';
        fixture.detectChanges();
        const link = fixture.debugElement.query(By.css('.auth-form__link'));
       expect(link.nativeElement.textContent).toContain('Already have an account? Login');
    });
     it('should emit formSubmit event when form is valid and submitted', () => {
        spyOn(component.formSubmit, 'emit');
          component.authForm.setValue({
             username: 'testuser',
              password: 'testpassword',
              country: 'us'
         });
         fixture.detectChanges();

         const form = fixture.debugElement.query(By.css('form'));
         form.nativeElement.dispatchEvent(new Event('submit'));
        expect(component.formSubmit.emit).toHaveBeenCalled();
   });
    it('should emit onLinkClick event when the link is clicked', () => {
        spyOn(component.onLinkClick, 'emit');
        const linkButton = fixture.debugElement.query(By.css('.auth-form__link-button'));
       linkButton.nativeElement.click();
        expect(component.onLinkClick.emit).toHaveBeenCalled();
    });
   it('should display an error message if the input is invalid and touched', () => {
        const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.dispatchEvent(new Event('focus'));
      input.nativeElement.dispatchEvent(new Event('blur'));
       fixture.detectChanges();

        const errorElement = fixture.debugElement.query(By.css('.auth-form__error'));
         expect(errorElement).toBeTruthy();
    });

  it('should not display an error message if the input is valid', () => {
        component.authForm.controls['username'].setValue('testuser');
        fixture.detectChanges();

        const errorElement = fixture.debugElement.query(By.css('.auth-form__error'));
        expect(errorElement).toBeFalsy();
   });

  it('should display an error message if errorMessage is provided', () => {
    component.errorMessage = 'Test Error Message';
    fixture.detectChanges();
     const messageElement = fixture.debugElement.query(By.css('.auth-form__message--error'));
     expect(messageElement.nativeElement.textContent).toContain('Test Error Message');
    });
   it('should not display an error message if errorMessage is not provided', () => {
        component.errorMessage = null;
        fixture.detectChanges();
        const messageElement = fixture.debugElement.query(By.css('.auth-form__message--error'));
         expect(messageElement).toBeFalsy();
   });
    it('should disable the submit button if the form is invalid', () => {
         const buttonElement = fixture.debugElement.query(By.css('.auth-form__button'));
          expect(buttonElement.nativeElement.disabled).toBe(true);
     });
      it('should enable the submit button if the form is valid', () => {
          component.authForm.setValue({
             username: 'testuser',
              password: 'testpassword',
              country: 'us'
         });
        fixture.detectChanges();
         const buttonElement = fixture.debugElement.query(By.css('.auth-form__button'));
          expect(buttonElement.nativeElement.disabled).toBe(false);
     });

});*/