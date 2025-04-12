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
// Para recibir los datos del usuario a editar
  modalService = inject(ModalService);
  errorService = inject(ValidationErrorService);
  iconService = inject(IconService);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  alertService = inject(AlertService);
// Para inyectar los servicios necesarios
  // Para crear el formulario reactivo
  createForm: FormGroup = this.fb.group({
    codUsu: [null],
    nomUsu: [[], [Validators.required, Validators.minLength(3)]],
    apeUsu: [[], [Validators.required, Validators.minLength(3)]],
    apmUsu: [[], [Validators.required, Validators.minLength(3)]],
    docUsu: [[], [Validators.required, Validators.minLength(8)]],
    passUsu:[[], [Validators.required, Validators.minLength(8)]],
    emaUsu: [[], [Validators.required, Validators.email]],
    celUsu: [[], [Validators.required, Validators.minLength(9)]],
    sexUsu: [[], [Validators.required]],
    estUsu: [[], [Validators.required]],
    createdAt: [new Date()],
    updatedAt: [new Date()],
  });
// Para crear el formulario reactivo
  // Para crear los errores de validación
  nomUsuErrors = signal<string[]>([]);
  apeUsuErrors = signal<string[]>([]);
  apmUsuErros = signal<string[]>([]);
  docUsuErrors = signal<string[]>([]);
  passUsuErrors = signal<string[]>([]);
  emaUsuErrors = signal<string[]>([]);
  celUsuErrors = signal<string[]>([]);
  sexUsuErrors = signal<string[]>([]);
  estUsuErrors = signal<string[]>([]);
  createdAtErrors = signal<string[]>([]);
  updatedAtErrors = signal<string[]>([]);

// Para crear los errores de validación
  constructor() {
    this.nomUsuFb.valueChanges.subscribe(() => {
      this.getnomUsuErrors();
    });
    this.apeUsuFb.valueChanges.subscribe(() => {
      this.getapeUsuErrors();
    });
    this.apmUsuFb.valueChanges.subscribe(() => {
      this.getapmUsuErrors();
    });
    this.docUsuFb.valueChanges.subscribe(() => {
      this.getdocUsuErrors();
    });
    this.passUsuFb.valueChanges.subscribe(() => {
      this.getpassUsuErrors();
    });
    this.emaUsuFb.valueChanges.subscribe(() => {
      this.getemaUsuErrors();
    });
    this.celUsuFb.valueChanges.subscribe(() => {
      this.getcelUsuErrors();
    });
    this.sexUsuFb.valueChanges.subscribe(() => {
      this.getsexUsuErrors();
    });
    this.estUsuFb.valueChanges.subscribe(() => {
      this.getestUsuErrors();
    });
    this.createdAtFb.valueChanges.subscribe(() => {
      this.getcreatedAtErrors();
    });
    this.updatedAtFb.valueChanges.subscribe(() => {
      this.getupdatedAtErrors();
    });
    console.log(this.data)
  }


  isEditMode = false;  // Para saber si estamos en modo edición

  ngOnInit() {
    if (this.data && Object.keys(this.data).length > 0) {
      this.isEditMode = true;
      this.createForm.patchValue(this.data);
    }
    this.nomUsuFb.valueChanges.subscribe(() => this.getnomUsuErrors());
    this.apeUsuFb.valueChanges.subscribe(() => this.getapeUsuErrors());
    this.apmUsuFb.valueChanges.subscribe(() => this.getapmUsuErrors());
    this.docUsuFb.valueChanges.subscribe(() => this.getdocUsuErrors());
    this.passUsuFb.valueChanges.subscribe(() => this.getpassUsuErrors());
    this.emaUsuFb.valueChanges.subscribe(() => this.getemaUsuErrors());
    this.celUsuFb.valueChanges.subscribe(() => this.getcelUsuErrors());
    this.sexUsuFb.valueChanges.subscribe(() => this.getsexUsuErrors());
    this.estUsuFb.valueChanges.subscribe(() => this.getestUsuErrors());
    this.createdAtFb.valueChanges.subscribe(() => this.getcreatedAtErrors());
    this.updatedAtFb.valueChanges.subscribe(() => this.getupdatedAtErrors());
  }
// Método para obtener el formulario
  get nomUsuFb() {return this.createForm?.controls['nomUsu'];}
  get apeUsuFb() {return this.createForm?.controls['apeUsu'];}
  get apmUsuFb() {return this.createForm?.controls['apmUsu'];}
  get docUsuFb() {return this.createForm?.controls['docUsu'];}
  get passUsuFb() {return this.createForm?.controls['passUsu'];}
  get emaUsuFb() {return this.createForm?.controls['emaUsu'];}
  get celUsuFb() {return this.createForm?.controls['celUsu'];}
  get sexUsuFb() {return this.createForm?.controls['sexUsu'];}
  get estUsuFb() {return this.createForm?.controls['estUsu'];}
  get createdAtFb() {return this.createForm?.controls['createdAt'];}
  get updatedAtFb() {return this.createForm?.controls['updatedAt'];}

// Método para obtener los errores del campo nombre
  getnomUsuErrors() {
    return this.nomUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('nomUsu'), 'Nombre')
    );
  }
// Método para obtener los errores del campo apellido
  getapeUsuErrors() {
    return this.apeUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('apeUsu'),'Apellido paterno')
    );
  }
// Método para obtener los errores del campo apellido materno
  getapmUsuErrors() {
    return this.apeUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('apmUsu'),'Apellido materno')
    );
  }
// Método para obtener los errores del campo dni
  getdocUsuErrors() {
    return this.docUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('docUsu'), 'DNI')
    );
  }
// Método para obtener los errores del campo contraseña
    getpassUsuErrors() {
      return this.passUsuErrors.set(
        this.errorService.getErrors(this.createForm.get('passUsu'), 'Contraseña')
      );
    }
// Método para obtener los errores del campo correo
  getemaUsuErrors() {
    return this.emaUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('emaUsu'), 'correo')
    );
  }
// Método para obtener los errores del campo celular
  getcelUsuErrors() {
    return this.celUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('celUsu'), 'celular')
    );
  }
// Método para obtener los errores del campo sexo
  getsexUsuErrors() {
    return this.sexUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('sexUsu'), 'sexo')
    );
  }
// Método para obtener los errores del campo estado
  getestUsuErrors() {
    return this.estUsuErrors.set(
      this.errorService.getErrors(this.createForm.get('estUsu'), 'estado')
    );
  }
// Método para obtener los errores del campo fecha creado
  getcreatedAtErrors() {
    return this.createdAtErrors.set(
      this.errorService.getErrors(this.createForm.get('createdAt'), 'fecha creado')
    );
  }
// Método para obtener los errores del campo fecha actualizado
  getupdatedAtErrors() {
    return this.updatedAtErrors.set(
      this.errorService.getErrors(this.createForm.get('updatedAt'), 'fecha actualizado')
    );
  }
// Método para obtener el icono
  getIcon(name: string): IconDefinition {
    return this.iconService.getIcon(name);
  }
// Método para abrir el modal
  onSubmit(): void {
    if (!this.createForm.valid) {
      this.getnomUsuErrors();
      this.getapeUsuErrors();
      this.getapmUsuErrors();
      this.getdocUsuErrors();
      this.getpassUsuErrors();
      this.getemaUsuErrors();
      this.getcelUsuErrors();
      this.getsexUsuErrors();
      this.getestUsuErrors();
      this.getcreatedAtErrors();
      this.getupdatedAtErrors();
      return;
    }
// Si el formulario no es válido, no se envía
    if (this.isEditMode) {
      // Modo actualización
      this.userService.updateUser(this.createForm.value.CodUsu, this.createForm.value).subscribe({
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
// Método para cerrar el modal
  closeModal(): void {
    this.modalService.closeModal();
  }
  // Método para cerrar el modal y limpiar el formulario
  clearForm(): void {
    this.createForm.reset();
    this.nomUsuErrors.set([]);
    this.apeUsuErrors.set([]);
    this.apmUsuErros.set([]);
    this.docUsuErrors.set([]);
    this.passUsuErrors.set([]);
    this.emaUsuErrors.set([]);
    this.celUsuErrors.set([]);
    this.sexUsuErrors.set([]);
    this.estUsuErrors.set([]);
    this.createdAtErrors.set([]);
    this.updatedAtErrors.set([]);
  }
}
