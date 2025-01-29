import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  // Observable para que otros componentes se suscriban
  themeState$ = this.isDarkTheme.asObservable();

  // Método para alternar el tema
  toggleTheme() {
    const currentTheme = this.isDarkTheme.value;
    this.isDarkTheme.next(!currentTheme);

    // Actualizar el `body` con la clase correspondiente
    if (!currentTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
        // Opcional: Guardar en localStorage
        localStorage.setItem('theme', !currentTheme ? 'dark' : 'light');
      }

      loadInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          this.isDarkTheme.next(true);
          document.body.classList.add('dark-theme');
        }
      }
}
