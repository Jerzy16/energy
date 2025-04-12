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
    { key: 'nomUsu', label: 'Nombre' },
    { key: 'apeUsu', label: 'Apellido paterno' },
    { key: 'apmUsu', label: 'Apellido materno' },
    { key: 'docUsu', label: 'DNI' },
    { key: 'passUsu', label: 'Contraseña' },
    { key: 'emaUsu', label: 'correo' },
    { key: 'celUsu', label: 'celular' },
    { key: 'sexUsu', label: 'sexo' },
    { key: 'estUsu', label: 'estado' },
    { key: 'createdAt', label: 'fecha creado' },
    { key: 'updatedAt', label: 'fecha actual' },
  ];

  data: [] = [];
  usuario = {}
  isLoading = false;
// Para mostrar el loading
  ngOnInit() {
    this.getAll();
  }
// Método para obtener todos los usuarios
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
// Método para abrir el modal de crear
  openCreateModal(): void {
    this.modalService.openModal('create');
  }
// Método para abrir el modal de editar
  openEditModal(item: DataItem): void {
    this.modalService.openModal('edit', item);
    this.usuario = item
  }
// Método para abrir el modal de ver
  openViewModal(item: DataItem): void {
    this.modalService.openModal('view', item);
    console.log(item);
  }
  // Método para abrir el modal de eliminar

  handleAction(event: { action: string; id: number }): void {
    const selectedItem = this.data.find((item) => item['codUsu'] === event.id);
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
// Método para buscar usuarios
  refreshData(): void {
    this.getAll();
  }
  openModal(): void {
    this.modalService.openModal('create', {});
  }
}
