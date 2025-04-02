import { Component, inject } from '@angular/core';
import { UserService } from './data-access/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/data-access/modal.service';
import { IconService } from '../../shared/data-access/icon.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from "../../shared/ui/modal/modal.component";
import { TableComponent } from "../../shared/ui/table/table.component";
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { SearchInputComponent } from "../../shared/ui/search-input/search-input.component";
import { LoadingComponent } from "../../shared/ui/loading/loading.component";
import { UserModalComponent } from "./ui/user-modal/user-modal.component";
interface Header {
  key: string;
  label: string;
}

interface DataItem {
  [key: string]: unknown;
}

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, TableComponent, ButtonComponent, SearchInputComponent, LoadingComponent, UserModalComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  modalService = inject(ModalService);
  iconService = inject(IconService);
  userService = inject(UserService);
  alertService = inject(AlertService);

  getIcon(name: string): IconDefinition {
    return this.iconService.getIcon(name);
  }

  headers: Header[] = [
    { key: 'firstName', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'city', label: 'Ciudad' },
  ];

  data: [] = [];
  user = {}
  isLoading = false;

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (response) => {
        this.data = response;
        console.log(response)
      },
      error: () => {
        this.alertService.toast('Error al cargar los usuarios', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openCreateModal(): void {
    this.modalService.openModal('create');
  }

  openEditModal(item: DataItem): void {
    this.modalService.openModal('edit', item);
    this.user = item
  }

  openViewModal(item: DataItem): void {
    this.modalService.openModal('view', item);
    console.log(item);
  }

  handleAction(event: { action: string; id: number }): void {
    const selectedItem = this.data.find((item) => item['id'] === event.id);
    if (!selectedItem) return;

    if (event.action === 'edit') {
      this.openEditModal(selectedItem);
    } else if (event.action === 'view') {
      this.openViewModal(selectedItem);
    } else if (event.action === 'delete') {
      this.alertService.confirm('Seguro que quieres eliminar este usuario?', () => {
        this.isLoading = true;
        this.userService.delete(event.id).subscribe({
          next: () => {
            this.alertService.toast('Usuario eliminado');
            this.getAll();
          },
          error: () => {
            this.alertService.toast('Error al eliminar la usuario', 'error');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      });
    }
  }

  refreshData(): void {
    this.getAll();
  }

  openModal(): void {
    this.modalService.openModal('create', {});
  }
}
