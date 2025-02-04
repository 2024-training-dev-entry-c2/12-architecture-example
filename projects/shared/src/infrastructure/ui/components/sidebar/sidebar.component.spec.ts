import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test-value',
              },
            },
            queryParams: of({ key: 'value' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render sidebar', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector('.sidebar')).toBeTruthy();
  });

  it('should render items', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.items = [{ title: 'test', link: '/test' }];
    fixture.detectChanges();
    expect(component.items).toEqual([{ title: 'test', link: '/test' }]);
    expect(compiled.querySelector('.sidebar__link')).toBeTruthy();
  });

  it('should render correct number of items', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.items = [
      { title: 'test1', link: '/test1' },
      { title: 'test2', link: '/test2' }
    ];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.sidebar__link').length).toBe(2);
  });


  it('should navigate to correct link on item click', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.items = [{ title: 'test', link: '/test' }];
    fixture.detectChanges();
    const item = compiled.querySelector('.sidebar__link') as HTMLAnchorElement;
    expect(item.href).toContain('/test');
  });

})
