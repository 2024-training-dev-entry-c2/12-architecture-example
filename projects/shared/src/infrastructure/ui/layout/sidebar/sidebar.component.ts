import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  private menuLinks: NodeListOf<HTMLAnchorElement> | null = null;
  private collapseBtn: HTMLElement | null = null;
  private sidebar: HTMLElement | null = null;
  private collapsedClass = 'sidebar--collapsed';

  private router = inject(Router);
  private destroy$ = new Subject<void>();
  currentRoute: string = '';

  menu = [
    {
      section: true,
      item: "Auth"
    },
    {
      section: false,
      item: "Users",
      href: "/user",
      svg: "assets/svgs/user.svg"
    }
  ];

  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.collapseBtn = this.el.nativeElement.querySelector('.sidebar__content__menu__button-collapse');
    this.sidebar = this.el.nativeElement.querySelector('.sidebar');

    this.currentRoute = this.router.url;
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.currentRoute = event.urlAfterRedirects;
    });
  }

  ngAfterViewInit(): void {
    this.menuLinks = this.el.nativeElement.querySelectorAll('.sidebar__content__menu a'); 

    if (this.menuLinks?.length) {
      this.menuLinks.forEach(link => {
        this.renderer.listen(link, 'mouseenter', () => {
          if (
            this.sidebar?.classList.contains(this.collapsedClass) &&
            window.matchMedia("(min-width: 768px)").matches
          ) {
            const tooltip = link.querySelector("span")?.textContent || '';
            this.renderer.setAttribute(link, 'title', tooltip);
          } else {
            this.renderer.removeAttribute(link, 'title');
          }
        });
      });
    }
  }

  toggleMenu(): void {
    if (!this.collapseBtn) {
      return;
    }

    if (this.sidebar?.classList.contains(this.collapsedClass)) {
      this.renderer.removeClass(this.sidebar, this.collapsedClass);
    } else {
      this.renderer.addClass(this.sidebar, this.collapsedClass);
    }

    const ariaExpanded = this.collapseBtn.getAttribute('aria-expanded') === 'true';
    const ariaLabel = this.collapseBtn.getAttribute('aria-label');

    this.renderer.setAttribute(this.collapseBtn, 'aria-expanded', String(!ariaExpanded));
    this.renderer.setAttribute(this.collapseBtn, 'aria-label', ariaLabel === 'collapse menu' ? 'expand menu' : 'collapse menu');
    this.cdr.detectChanges()
  }

  goTo(href: string): void {
    this.router.navigate([href]);
  }

  isActive(option: any): boolean {
    return option.href && this.currentRoute === option.href;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}