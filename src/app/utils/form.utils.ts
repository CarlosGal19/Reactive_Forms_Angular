import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

type fieldNameType =
  'name'
  | 'price'
  | 'inStock'
  | 'favorites'
  | 'termsAndConditions'
  | 'password'
  | 'email'
  | 'username';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Promise resolved successfully')
    }, 1500)
  })
}
export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `Minimum of ${errors['minlength'].requiredLength} characters`
        case 'min':
          return `Minimum value of ${errors['min'].min}`
        case 'pattern':
          return 'Invalid due to regular expression'
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: fieldNameType): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: fieldNameType): string | null {
    const errors = form.controls[fieldName].errors ?? {};
    return this.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      !!formArray.controls[index].errors &&
      formArray.controls[index].touched
    )
  }

  static getFieldErrorInArray(form: FormGroup, index: number): string | null {
    const formArray = form.controls['favorites'] as FormArray;
    const errors = formArray.controls[index].errors ?? {};

    return this.getTextErrors(errors);
  }

  static fieldsMatch(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : {
        passwordMismatch: true
      }
    }
  }

  static async checkServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hello@world.com') {
      return { invalidEmail: true }
    }
    return null;
  }

  static validateUsername(control: AbstractControl): ValidationErrors | null {
    return control.value === 'admin_root' ? { invalidUsername: true } : null;
  }
}
