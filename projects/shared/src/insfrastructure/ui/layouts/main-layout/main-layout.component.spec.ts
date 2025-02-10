import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainLayoutComponent,
        HeaderComponent,
        FooterComponent,
        RouterOutlet,
        RouterTestingModule,
      ],
      providers: [provideRouter],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct layout structure', () => {
    const layout = fixture.debugElement.query(By.css('.layout'));
    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    const main = fixture.debugElement.query(By.css('.layout__main-content'));
    const footer = fixture.debugElement.query(By.directive(FooterComponent));
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(layout).toBeTruthy();
    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });

  it('should have correct accessibility attributes', () => {
    const layout = fixture.debugElement.query(By.css('.layout'));
    const main = fixture.debugElement.query(By.css('.layout__main-content'));

    expect(layout.attributes['role']).toBe('application');
    expect(layout.attributes['aria-label']).toBe('Main Layout');
    expect(main.attributes['role']).toBe('main');
    expect(main.attributes['aria-label']).toBe('Main Content');
  });

  it('should render header component', () => {
    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(header).toBeTruthy();
  });

  it('should render footer component', () => {
    const footer = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footer).toBeTruthy();
  });

  it('should render router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
