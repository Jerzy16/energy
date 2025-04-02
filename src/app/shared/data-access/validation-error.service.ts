import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorService {
  getErrors(control: AbstractControl | null, fieldName: string): string[] {
    if (!control || !control.errors) return [];

    const errors: string[] = [];

    if (control.hasError('required')) {
      errors.push(`⚠ El campo ${fieldName} es obligatorio.`);
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      errors.push(`⚠ ${fieldName} debe tener al menos ${minLength} caracteres.`);
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      errors.push(`⚠ ${fieldName} no debe tener más de ${maxLength} caracteres.`);
    }
    if (control.hasError('email')) {
      errors.push(`⚠ Introduce un correo electrónico válido.`);
    }
    if (control.hasError('pattern')) {
      errors.push(`⚠ Formato inválido en ${fieldName}.`);
    }

    return errors;
  }

  hasError(formGroup: FormGroup, controlName: string, errorType: string): boolean | undefined {
    const control = formGroup.get(controlName);
    if (control) {
      return control.hasError(errorType) && control.touched;
    }
    return undefined;
  }
}
