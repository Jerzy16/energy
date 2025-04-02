import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { IconService } from '../../data-access/icon.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-action-button',
  imports: [FontAwesomeModule, TooltipComponent],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() action!: 'view' | 'edit' | 'delete';
  @Input() id!: number;
  @Output() actionClicked = new EventEmitter<{ action: string, id: number }>();

  iconService = inject(IconService);

  getIcon(name: string): IconDefinition{
    return this.iconService.getIcon(name)
  }

  get icon(): IconDefinition | null
  {
    switch(this.action){
      case 'view': return this.getIcon('eye');
      case 'edit': return this.getIcon('edit');
      case 'delete': return this.getIcon('delete');
      default: return null;
    }
  }

  get label()
  {
    switch(this.action){
      case 'view': return 'ver';
      case 'edit': return 'editar';
      case 'delete': return 'eliminar';
    }
  }

  get buttonClass() {
    switch(this.action){
      case 'view': return 'bg-green-700/80 hover:bg-green-700/100';
      case 'edit': return 'bg-blue-700/80 hover:bg-blue-700/100';
      case 'delete': return 'bg-red-700/80 hover:bg-red-700/100';
      default: return '';
    }
  }

  handleClick() {
    this.actionClicked.emit({ action: this.action, id: this.id });
  }

}
