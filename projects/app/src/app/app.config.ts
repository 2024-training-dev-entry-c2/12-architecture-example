import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EnvironmentService } from 'shared';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: EnvironmentService,
      useFactory: () => {
        const envService = new EnvironmentService();
        envService.setApiUrl(environment.apiUrl);
        return envService;
      },
    },
  ],
};
