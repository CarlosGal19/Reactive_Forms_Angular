import { FormGroup } from "@angular/forms";

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: 'name' | 'price' | 'inStock'): boolean | null {
    return (
      !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: 'name' | 'price' | 'inStock'): string | null {
    const errors =  form.controls[fieldName].errors ?? {};

    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `Minimum of ${errors['minlength'].requiredLength} characters`
        case 'min':
          return `Minimum value of ${errors['min'].min}`
      }
    }

    return null;
  }
}
