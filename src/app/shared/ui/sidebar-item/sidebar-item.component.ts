import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
  standalone: true
})
export class SidebarItemComponent {
  @Input() icon?: IconDefinition; 
  @Input() label!: string;        
  @Input() link: string = '#';   
  @Input() borderColor: string = 'purple-600'; 

}
