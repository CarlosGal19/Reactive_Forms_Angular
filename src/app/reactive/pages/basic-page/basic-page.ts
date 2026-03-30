import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

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

  formUtils = FormUtils;

  myForm: FormGroup = this.basicFormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]], // [0] is initial value, [1] sync validators, [2] async validators
    price: [0, [Validators.required, Validators.min(0.1), Validators.required]],
    inStock: [0, [Validators.required, Validators.min(0)]]
  })

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
