import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { IUser } from '../../../../domain/model/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userCards: NodeListOf<HTMLElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, UserCardComponent],
    })
      .overrideComponent(UsersComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render any user cards if users input is empty', () => {
    fixture.componentRef.setInput('users', []);
    fixture.detectChanges();
    userCards = fixture.nativeElement.querySelectorAll('lib-user-card');
    expect(userCards.length).toBe(0);
  });

  it('should render user cards for each user in the input', () => {
    const mockUsers: IUser[] = [
      { email: 'test1@example.com', role: 'administrator', id: '' },
      { email: 'test2@example.com', role: 'editor', id: '' },
    ];
    fixture.componentRef.setInput('users', mockUsers);
    fixture.detectChanges();
    userCards = fixture.nativeElement.querySelectorAll('lib-user-card');
    expect(userCards.length).toBe(mockUsers.length);

    const firstUserCard = userCards[0];
    expect(firstUserCard.getAttribute('ng-reflect-email')).toBe(
      'test1@example.com'
    );
    expect(firstUserCard.getAttribute('ng-reflect-role')).toBe('administrator');

    const secondUserCard = userCards[1];
    expect(secondUserCard.getAttribute('ng-reflect-email')).toBe(
      'test2@example.com'
    );
    expect(secondUserCard.getAttribute('ng-reflect-role')).toBe('editor');
  });
});
