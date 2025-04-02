import { UserService } from './../../data-access/user.service';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ModalService } from '../../../../shared/data-access/modal.service';
import { ValidationErrorService } from '../../../../shared/data-access/validation-error.service';
import { IconService } from '../../../../shared/data-access/icon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/data-access/alert.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControlComponent } from "../../../../shared/ui/form-control/form-control.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";

@Component({
  selector: 'app-user-modal',
  imports: [FormControlComponent, ButtonComponent],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css',
})
export class UserModalComponent {
  @Output() refresh = new EventEmitter<void>();
  @Input() data = {}

  modalService = inject(ModalService);
  errorService = inject(ValidationErrorService);
  iconService = inject(IconService);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  alertService = inject(AlertService);

  createForm: FormGroup = this.fb.group({
    id: [null],
    firstName: [[], [Validators.required, Validators.minLength(3)]],
    lastName: [[], [Validators.required, Validators.minLength(3)]],
    city: [[], [Validators.required, Validators.minLength(3)]],
  });

  firstNameErrors = signal<string[]>([]);
  lastNameErrors = signal<string[]>([]);
  cityErros = signal<string[]>([]);


  constructor() {
    this.firstNameFb.valueChanges.subscribe(() => {
      this.getFirstNameErrors();
    });

    this.lastNameFb.valueChanges.subscribe(() => {
      this.getLastNameErrors();
    });

    this.cityFb.valueChanges.subscribe(() => {
      this.getCityErrors();
    });
    console.log(this.data)
  }


  isEditMode = false;  // Para saber si estamos en modo edición

  ngOnInit() {
    if (this.data && Object.keys(this.data).length > 0) {
      this.isEditMode = true;
      this.createForm.patchValue(this.data);
    }

    this.firstNameFb.valueChanges.subscribe(() => this.getFirstNameErrors());
    this.lastNameFb.valueChanges.subscribe(() => this.getLastNameErrors());
    this.cityFb.valueChanges.subscribe(() => this.getCityErrors());
  }

  get firstNameFb() {
    return this.createForm?.controls['firstName'];
  }

  get lastNameFb() {
    return this.createForm?.controls['lastName'];
  }

  get cityFb() {
    return this.createForm?.controls['city'];
  }


  getFirstNameErrors() {
    return this.firstNameErrors.set(
      this.errorService.getErrors(this.createForm.get('firstName'), 'Nombre')
    );
  }

  getLastNameErrors() {
    return this.lastNameErrors.set(
      this.errorService.getErrors(
        this.createForm.get('lastName'),
        'Apellido'
      )
    );
  }
  getCityErrors() {
    return this.lastNameErrors.set(
      this.errorService.getErrors(
        this.createForm.get('city'),
        'Ciudad'
      )
    );
  }

  getIcon(name: string): IconDefinition {
    return this.iconService.getIcon(name);
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      this.getFirstNameErrors();
      this.getLastNameErrors();
      this.getCityErrors();
      return;
    }

    if (this.isEditMode) {
      // Modo actualización
      this.userService.updateUser(this.createForm.value.id, this.createForm.value).subscribe({
        next: () => {
          this.alertService.toast('Usuario actualizado con éxito');
          this.refresh.emit();
          this.closeModal();
        },
        error: () => {
          this.alertService.toast('Error al actualizar el usuario', 'error');
        },
      });
    } else {
      // Modo creación
      this.userService.saveUser(this.createForm.value).subscribe({
        next: () => {
          this.alertService.toast('Usuario creado con éxito');
          this.refresh.emit();
          this.closeModal();
        },
        error: () => {
          this.alertService.toast('Error al crear el usuario', 'error');
        },
      });
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  clearForm(): void {
    this.createForm.reset();
    this.firstNameErrors.set([]);
    this.lastNameErrors.set([]);
    this.cityErros.set([]);
  }
}
