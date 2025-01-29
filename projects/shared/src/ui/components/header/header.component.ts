
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../toogle-theme/theme.service';

@Component({
  selector: 'lib-header-navbar',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderNavbarComponent {
  navItems = [
    { label: 'Home', icon: 'fas fa-tachometer-alt', active: true,link: '/' , ariaLabel: "Home" },
    { label: 'Dashboard', icon: 'fas fa-tachometer-alt', active: false,link: '/dashboard' , ariaLabel: "Dashboard" },
    { label: 'Clients', icon: 'far fa-address-book', active: false,link: '/clients' , ariaLabel: "Clients" },
    { label: 'Menus', icon: 'far fa-clone', active: false,link: '/menu' , ariaLabel: "Menus" },
    { label: 'Orders', icon: 'far fa-calendar-alt', active: false,link: '/orders' , ariaLabel: "Orders" },

  ];
  images = '/assets/icons/toogleMode.svg#icon-moon'; // Imagen inicial
  darkTheme = false;

  ngOnInit(): void {
    setTimeout(() => this.updateHoriSelector(), 0);
    setTimeout(() => this.setActiveOnPath(), 0);
    this.updateHoriSelector();
    this.setActiveOnPath();
    this.themeService.themeState$.subscribe((isDark) => {
      this.darkTheme = isDark;

      // Actualizar la imagen según el tema
      this.images = isDark
        ? '/assets/icons/toogleMode.svg#icon-dark'
        : '/assets/icons/toogleMode.svg#icon-moon';
    });
  }

  onNavItemClick(item: any): void {
    this.navItems.forEach((nav) => (nav.active = false));
    item.active = true;
    this.updateHoriSelector();
    setTimeout(() => this.updateHoriSelector(), 0);
  }

  updateHoriSelector(): void {
    const tabs = document.getElementById('navbarSupportedContent');
    const activeItem = tabs?.querySelector('.active') as HTMLElement;
    const horiSelector = document.querySelector('.hori-selector') as HTMLElement;

    if (activeItem && horiSelector) {
      const { offsetHeight: height, offsetWidth: width, offsetTop: top, offsetLeft: left } = activeItem;

      horiSelector.style.top = `${top}px`;
      horiSelector.style.left = `${left}px`;
      horiSelector.style.height = `${height}px`;
      horiSelector.style.width = `${width}px`;
      setTimeout(() => this.updateHoriSelector(), 0);
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    setTimeout(() => this.updateHoriSelector(), 200);
  }

  setActiveOnPath(): void {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const targetItem = this.navItems.find((item) => item.label.toLowerCase() === path.split('.')[0]);
    if (targetItem) {
      this.onNavItemClick(targetItem);
    }
  }



  constructor(private themeService: ThemeService) {}
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
