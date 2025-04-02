import { Component, inject } from '@angular/core';
import { IconService } from '../../data-access/icon.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-loading',
  imports: [FontAwesomeModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  iconService = inject(IconService)

  getIcon(value: string): IconDefinition{
    return this.iconService.getIcon(value)
  }
}
