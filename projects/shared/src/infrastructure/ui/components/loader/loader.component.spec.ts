import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { provideRouter } from '@angular/router';
import { usersRoutes } from 'users';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [
        provideRouter(usersRoutes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the loader initially', () => {
    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeNull();
  });

  it('should display the loader when showLoader is true', () => {
    fixture.componentRef.setInput('showLoader', true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeTruthy();
  });

  it('should hide the loader when showLoader is false', () => {

    fixture.componentRef.setInput('showLoader', true);

    fixture.detectChanges();
    fixture.componentRef.setInput('showLoader', false);

    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeNull();
  });
});