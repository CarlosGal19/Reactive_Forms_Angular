import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStock: new FormControl(0)
  // });

  private basicFormBuilder = inject(FormBuilder);

  myForm: FormGroup = this.basicFormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]], // [0] is initial value, [1] sync validators, [2] async validators
    price: [0, [Validators.required, Validators.min(0.1), Validators.required]],
    inStock: [0, [Validators.required, Validators.min(0)]]
  })

  isValidField(fieldName: 'name' | 'price' | 'inStock'): boolean | null {
    return !!this.myForm.controls[fieldName].errors
  }

  getFieldError(fieldName: 'name' | 'price' | 'inStock'): string | null {
    const errors =  this.myForm.controls[fieldName].errors ?? {};

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
