import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'shared';

@Component({
  selector: 'lib-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent implements OnInit {
  image = '/assets/icons/logo-dark.svg';
  ngOnInit(): void {
    this.themeService.themeState$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
      this.image = isDark
        ? '/assets/icons/logo.svg'
        : '/assets/icons/logo-dark.svg';
    });
  }

  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}
}
