import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoverComponent } from './login-cover.component';
import { provideRouter } from '@angular/router';
import { usersRoutes } from '../../routes/users.routes';
import { UserInfoService } from 'shared';

describe('LoginCoverComponent', () => {
  let component: LoginCoverComponent;
  let fixture: ComponentFixture<LoginCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCoverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the login illustration image', () => {
    const imageElement: HTMLImageElement =
      fixture.nativeElement.querySelector('.illustration');
    expect(imageElement).toBeTruthy();
    expect(imageElement.src).toContain('assets/users/svg/login_image.svg');
    expect(imageElement.alt).toBe('Login Illustration');
  });

  it('should display the heading text', () => {
    const headingElement: HTMLElement =
      fixture.nativeElement.querySelector('h1');
    expect(headingElement.textContent).toContain('Account Manager Hub');
  });

  it('should display the paragraph text', () => {
    const paragraphElement: HTMLElement =
      fixture.nativeElement.querySelector('p');
    expect(paragraphElement.textContent).toContain(
      'Manage your accounts, manage your cards and generate transactions faster.'
    );
  });
});
