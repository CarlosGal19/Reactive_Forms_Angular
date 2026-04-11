import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

type fieldNameType = 'name' | 'price' | 'inStock' | 'favorites' | 'termsAndConditions';
export class FormUtils {

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
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
}
