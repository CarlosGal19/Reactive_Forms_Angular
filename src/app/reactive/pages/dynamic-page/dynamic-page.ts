import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.formBuilder.array([
      ['Alien Isolation', Validators.required],
      ['Far Cry primal', Validators.required]
    ], [Validators.minLength(2)])
  });

  get favoritesGames() {
    return this.myForm.get('favorites') as FormArray;
  }
}
