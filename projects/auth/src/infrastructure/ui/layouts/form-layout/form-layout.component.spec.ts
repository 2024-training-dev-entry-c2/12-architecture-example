import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLayoutComponent } from './form-layout.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormLayoutComponent', () => {
  let component: FormLayoutComponent;
  let fixture: ComponentFixture<FormLayoutComponent>;
  let routerOutlet: HTMLElement | null;
  let dialogContainer: HTMLElement | null;
  let loadingScreen: HTMLElement | null;

  const activatedRouteMock = {
    snapshot: {
      data: {},
    },
    params: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLayoutComponent, RouterOutlet],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    })
      .overrideComponent(FormLayoutComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FormLayoutComponent);
    component = fixture.componentInstance;
    routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    dialogContainer = fixture.nativeElement.querySelector(
      'lib-dialog-container'
    );
    loadingScreen = fixture.nativeElement.querySelector('lib-loading');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    expect(routerOutlet).toBeTruthy();
  });

  it('should render the dialog container', () => {
    expect(dialogContainer).toBeTruthy();
  });

  it('should render the loading screen', () => {
    expect(loadingScreen).toBeTruthy();
  });
});
