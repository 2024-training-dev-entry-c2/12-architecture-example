import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterComponent } from '../../components/register/register.component';
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'lib-dashboard-layout',
  imports: [RegisterComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  @Output() logoutRequested = new EventEmitter<void>();


  @Output() submitted = new EventEmitter<any>();
  @Input() registerForm: FormGroup;

  onSubmit() {

    if (this.registerForm.valid) {
      this.submitted.emit(this.registerForm.value);
    } else {
      console.log('Form is invalid, marking as touched');
      this.registerForm.markAllAsTouched();
    }
  }

  handleLogout(): void {
    this.logoutRequested.emit();
  }

}