import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconService } from '../../data-access/icon.service';

@Component({
  selector: 'app-search-input',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>();

  iconService = inject(IconService);

  getIcon(name: string): IconDefinition {
    return this.iconService.getIcon(name);
  }

  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm); 
  }
}
