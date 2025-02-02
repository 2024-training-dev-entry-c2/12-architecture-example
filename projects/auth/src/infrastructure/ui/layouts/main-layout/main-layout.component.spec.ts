import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let sidebar: HTMLElement | null;
  let headerContainer: HTMLElement | null;
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
      imports: [MainLayoutComponent, RouterOutlet],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(MainLayoutComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    sidebar = fixture.nativeElement.querySelector('lib-sidebar');
    headerContainer = fixture.nativeElement.querySelector(
      'lib-header-container'
    );
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

  it('should render the sidebar', () => {
    expect(sidebar).toBeTruthy();
  });

  it('should render the header container', () => {
    expect(headerContainer).toBeTruthy();
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
