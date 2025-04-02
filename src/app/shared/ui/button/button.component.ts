import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true
})
export class ButtonComponent {
  @Input() text: string = ''; 
  @Input() bgColor: string = 'bg-blue-500';
  @Input() textColor: string = 'text-white';  
  @Input() padding: string = 'p-2';
  @Input() disabled: boolean = false; 
  @Input() rounded: boolean = true;
  @Input() icon?: IconDefinition;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<void>(); 

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
