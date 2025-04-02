import { Component, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconService } from '../../data-access/icon.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-radio-group',
  imports: [FontAwesomeModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css'
})
export class RadioGroupComponent {

  @Input() label: string = 'Selecciona una opcion';
  @Input() options: { value: string, label: string }[] = [];
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() errorMessage: string[] = [];

  iconService = inject(IconService)

  getIcon(value: string): IconDefinition{
    return this.iconService.getIcon(value)
  }

}
