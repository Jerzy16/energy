import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-group',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.css'
})
export class SidebarGroupComponent {
  @Input() icon!: IconDefinition;
  @Input() label!: string;
  @Input() items!: { label: string; link: string }[];
  @Input() isOpen: boolean = false;

  @Output() toggle = new EventEmitter<string>(); 

  router = inject(Router)
  
  toggleGroup() {
    this.toggle.emit(this.label);
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }

  faChevronRight = faChevronRight
}
