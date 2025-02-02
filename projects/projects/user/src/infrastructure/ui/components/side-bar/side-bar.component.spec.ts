import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from '../../../services/menu.service';
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarComponent],
      providers: [AuthService, MenuService]
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct ARIA attributes', () => {
    const nav = fixture.nativeElement.querySelector('.sidebar');
    expect(nav.getAttribute('role')).toBe('navigation');
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

});