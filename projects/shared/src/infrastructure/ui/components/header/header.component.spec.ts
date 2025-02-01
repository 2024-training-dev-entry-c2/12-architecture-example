import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent] 
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an empty username initially', () => {
    const usernameElement: HTMLElement = fixture.nativeElement.querySelector('.user-info');
    expect(usernameElement.textContent?.trim()).toEqual('');
  });

  it('should display the provided username', () => {
    fixture.componentRef.setInput('username', 'Test User');
    fixture.detectChanges();
    const usernameElement: HTMLElement = fixture.nativeElement.querySelector('.user-info');
    expect(usernameElement.textContent?.trim()).toEqual('Test User');
  });

  it('should update the username when the input changes', () => {
    fixture.componentRef.setInput('username', 'Initial User');
    fixture.detectChanges();
    let usernameElement: HTMLElement = fixture.nativeElement.querySelector('.user-info');
    expect(usernameElement.textContent?.trim()).toEqual('Initial User');

    fixture.componentRef.setInput('username', 'Updated User');
    fixture.detectChanges();
    usernameElement = fixture.nativeElement.querySelector('.user-info');
    expect(usernameElement.textContent?.trim()).toEqual('Updated User');
  });
});