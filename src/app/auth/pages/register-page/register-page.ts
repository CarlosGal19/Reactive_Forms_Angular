import { AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    username: ['', [Validators.required, Validators.minLength(6)], Validators.pattern(this.formUtils.notOnlySpacesPattern)],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: [this.formUtils.fieldsMatch('password', 'confirmPassword')]
  });



  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)
  }
}
