import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AddModalService {
    private modalSubject = new BehaviorSubject<boolean>(false);
    modalState$ = this.modalSubject.asObservable();

  
    openModal() {
      this.modalSubject.next(true);
    }
  
    closeModal() {
      this.modalSubject.next(false);
    }
  }
  