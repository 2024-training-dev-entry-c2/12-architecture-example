import { computed, Injectable, signal } from "@angular/core";
import { Alert } from "../interfaces/alert-types";


@Injectable({ providedIn: 'root' })
export class AlertService {
 private alertSignal = signal<Alert | null>(null);
 alert = computed(() => this.alertSignal());

 showAlert(message: string, type: 'success' | 'error' | 'warning' = 'error', duration = 2000) {
   this.alertSignal.set({ message, type });
   setTimeout(() => this.alertSignal.set(null), duration);
 }
 
}
