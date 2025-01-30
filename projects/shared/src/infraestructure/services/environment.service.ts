import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private _apiUrl!: string;

  setApiUrl(url: string) {
    this._apiUrl = url;
  }

  get apiUrl(): string {
    if (!this._apiUrl) {
      throw new Error('API URL no ha sido configurada en EnvironmentService.');
    }
    return this._apiUrl;
  }
}
