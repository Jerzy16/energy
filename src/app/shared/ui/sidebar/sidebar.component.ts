import { Component, EventEmitter, Input } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { SidebarItemComponent } from "../sidebar-item/sidebar-item.component";
import { faCoffee, faKey, faUsers, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SidebarGroupComponent } from '../sidebar-group/sidebar-group.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../data-access/sidebar.service';

interface SidebarItem {
  type: 'item';
  icon?: IconDefinition;
  label: string;
  link: string;
}
interface SidebarGroup {
  type: 'group';
  icon: IconDefinition;
  label: string;
  items: SidebarItem[];
}

interface SidebarSeparator {
  type: 'separator';
  label: string;
}

type SidebarMenuItem = SidebarItem | SidebarGroup | SidebarSeparator;

@Component({
  selector: 'app-sidebar',
  imports: [LogoComponent, SidebarItemComponent, SidebarGroupComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isOpen = true;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarState$.subscribe(state => this.isOpen = state);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  activeGroup: string = '';

  toggleGroup(groupLabel: string) {
    this.activeGroup = this.activeGroup === groupLabel ? '' : groupLabel;
  }

  faCoffee = faCoffee
  faUsers = faUsers
  faKey = faKey
//menu interface
  menuItems: SidebarMenuItem[] = [
    { type: 'separator', label: 'Dashboard' },
    { type: 'item', icon: faCoffee, label: 'Dashboard', link: '/' },
    { type: 'separator', label: 'Otra sección' },
    { type: 'group',icon: faUsers,label: 'Gestión',
      items: [
        { type: 'item', label: 'Usuarios', link: '/admin/user' },
        { type: 'item', label: 'Roles', link: '/admin/roles' }
      ]
    },
    { type: 'separator', label: 'Cuestionario' },
    { type: 'group',icon: faUsers,label: 'Mantenimiento',
      items: [
        { type: 'item', label: 'Preguntas', link: '/question' },
        { type: 'item', label: 'Roles', link: '/roles' },
        { type: 'item', label: 'Roles', link: '/roles' }
      ]
    },
  ];
}
