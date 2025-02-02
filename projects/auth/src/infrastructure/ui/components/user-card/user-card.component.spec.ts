import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let avatarImage: HTMLImageElement;
  let emailElement: HTMLHeadingElement;
  let roleElement: HTMLParagraphElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    })
      .overrideComponent(UserCardComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    avatarImage = fixture.nativeElement.querySelector(
      '.users__card__avatar--img'
    );
    emailElement = fixture.nativeElement.querySelector('.users__card__email');
    roleElement = fixture.nativeElement.querySelector('.users__card__role');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user avatar with correct properties', () => {
    expect(avatarImage).toBeTruthy();
    expect(avatarImage.getAttribute('src')).toBe('assets/images/user.jpg');
    expect(avatarImage.getAttribute('alt')).toBe('User Avatar');
    expect(avatarImage.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the email and role from input', () => {
    fixture.componentRef.setInput('email', 'test@example.com');
    fixture.componentRef.setInput('role', 'administrator');
    fixture.detectChanges();
    expect(emailElement.textContent).toContain('test@example.com');
    expect(roleElement.textContent).toContain('Role: administrator');
  });
});
