import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from '../../data-access/sidebar.service';
import { IconService } from '../../data-access/icon.service';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sidebarService = inject(SidebarService)
  iconService = inject(IconService)

  closeSidebar() {
    this.sidebarService.toggleSidebar(); 
  }

  get icon() {
    return this.iconService.getIcon('bars');
  }

}
