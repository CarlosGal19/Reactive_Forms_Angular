import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  myForm = this.basicFormBuilder.group({
    name: [''], // [0] is initial value, [1] sync validators, [2] async validators
    price: [0],
    isStock: [0]
  })
}
