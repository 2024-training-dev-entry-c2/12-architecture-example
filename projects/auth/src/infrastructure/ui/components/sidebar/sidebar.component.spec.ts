import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let logoImage: HTMLImageElement;
  let navigationLinks: NodeListOf<HTMLAnchorElement>;

  const activatedRouteMock = {
    snapshot: {
      data: {},
    },
    params: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterModule, FontAwesomeModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    })
      .overrideComponent(SidebarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    logoImage = fixture.nativeElement.querySelector('.sidebar__logo');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image', () => {
    expect(logoImage).toBeTruthy();
    expect(logoImage.getAttribute('src')).toBe('assets/images/logo.png');
    expect(logoImage.getAttribute('alt')).toBe('Application Logo');
  });

  it('should render navigation links', () => {
    fixture.detectChanges();
    navigationLinks = fixture.nativeElement.querySelectorAll(
      '.sidebar__links__item'
    );

    expect(navigationLinks.length).toBe(component.links.length);

    const firstLink = navigationLinks[0];

    expect(firstLink.getAttribute('href')).toBe('/admins');
    expect(firstLink.querySelector('span')?.textContent).toContain('Admins');
    const icon = firstLink.querySelector('fa-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList).toContain('sidebar__links__icon');
  });
});
