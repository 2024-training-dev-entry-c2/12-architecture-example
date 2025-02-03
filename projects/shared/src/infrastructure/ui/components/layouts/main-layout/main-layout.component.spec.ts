import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeaderNavbarComponent } from '../../header/header.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MainLayoutComponent], // Agregamos el módulo de testeo del router
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should to render header and router-outlet', () => {
    const header = fixture.debugElement.query(
      By.directive(HeaderNavbarComponent)
    );
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(header).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
  it('should to render HeaderNavbarComponent ', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('lib-header-navbar')).toBeTruthy();
  });
});
