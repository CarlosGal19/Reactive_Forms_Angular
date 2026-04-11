import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
})
export class SwitchesPage {
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils

  myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantsNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
