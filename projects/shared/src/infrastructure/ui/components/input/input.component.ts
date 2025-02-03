import { Component, inject, Input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { IInput } from '../../../../domain/model/input.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  viewProviders: [
    { provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }],
})
export class InputComponent {
  @Input() data: IInput = {} as IInput;
}
