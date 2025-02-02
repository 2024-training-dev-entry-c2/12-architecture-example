import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { IAdmin } from '../../../../domain/model/admin.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let createAdminLink: HTMLAnchorElement;
  let adminEmailSpan: HTMLSpanElement;
  let logoutButton: HTMLButtonElement;

  const activatedRouteMock = {
    snapshot: {
      data: {},
    },
    params: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    createAdminLink = fixture.nativeElement.querySelector(
      'a'
    );
    adminEmailSpan = fixture.nativeElement.querySelector(
      '.header__admin-email'
    );
    logoutButton = fixture.nativeElement.querySelector('.header__logout');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a link to create admin', () => {
    expect(createAdminLink).toBeTruthy();
    expect(createAdminLink.getAttribute('href')).toBe('/register');
  });

  it('should render the admin email', () => {
    const mockAdmin: IAdmin = {
      email: 'test@example.com',
      id: '',
      token: '',
    };

    fixture.componentRef.setInput('admin', mockAdmin);
    fixture.detectChanges();
    expect(adminEmailSpan.textContent).toContain('test@example.com');
  });

  it('should render a logout button', () => {
    expect(logoutButton).toBeTruthy();
  });

  it('should emit onLogout event when logout button is clicked', () => {
    let emitted = false;
    component.onLogout.subscribe(() => {
      emitted = true;
    });
    logoutButton.click();
    expect(emitted).toBeTrue();
  });
});
