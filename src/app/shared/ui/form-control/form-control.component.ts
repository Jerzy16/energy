
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from "../label/label.component";
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-form-control',
  imports: [ReactiveFormsModule, LabelComponent, CommonModule, ErrorMessageComponent],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
  standalone: true
})
export class FormControlComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() required: boolean = true;
  @Input() formType: 'text' | 'textarea' = 'text';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() errorMessage: string[] = [];

  get errors() {
    return this.errorMessage.length > 0
  }
}
