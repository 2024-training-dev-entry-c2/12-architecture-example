import { Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { TableEventsService } from '../../../services/utils/table-events.service';
import { IBadge } from '../../interfaces/badge.interface';
import { IButton } from '../../interfaces/button.interface';
import { IInput } from '../../interfaces/input.interface';
import { ITableHeader } from '../../interfaces/table-header.interface';
import { BooleanTransformationPipe } from '../../pipes/boolean-transformation.pipe';
import { DataKeyTransfromedPipe } from '../../pipes/data-key-transfromed.pipe';
@Component({
  selector: 'app-table',
  imports: [BadgeComponent, FormsModule, InputComponent, ButtonComponent, BooleanTransformationPipe, DataKeyTransfromedPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges{
  dataHeader = input<ITableHeader[]>([]);
  dataBody = input<any[]>([]);
  dataBodyFiltered: any[] = [];

  private tableEventsService = inject(TableEventsService);

  formGroup = new FormGroup({'search': new FormControl()});
  
  inputData: IInput = {
    id: "search",
    label: "Search",
    value: "",
    placeholder: "Search...",
    type: "text",
    formControlName: "search",
    required: false,
    disabled: false
  };

  buttonData: IButton = {
    type: "info",
    value: "Add record",
    disabled: false
  };

  ngOnInit(): void {
    this.dataBodyFiltered = this.dataBody();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onSearch(this.inputData.value);
  }

  getBadge(value: string): IBadge {
    return {
      type: value === "ACTIVE" ? "info" : "error",
      value: value
    } as IBadge;
  }

  onButtonClick(event: any): void {
    this.tableEventsService.emitEvent("buttonClick", event);
  }

  onSearch(event: string): void {
    if (!event) {
      this.dataBodyFiltered = [...this.dataBody()];
      return;
    }

    const searchTerm = event.trim().toLowerCase();

    this.dataBodyFiltered = this.dataBody().filter(item => {
      return Object.values(item).some(value => {
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(searchTerm);
        }
        return false
      });
    });
  }

}