import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { switchMap, tap } from 'rxjs';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);
  formBuilder = inject(FormBuilder);

  regions = this.countryService.regions;
  countries = signal<ICountry[]>([]);
  borders = signal<ICountry[]>([]);

  myForm: FormGroup = this.formBuilder.group({
    region: [
      '',
      [
        Validators.required
      ]
    ],
    country: [
      '',
      [
        Validators.required
      ]
    ],
    border: [
      '',
      [
        Validators.required
      ]
    ]
  });

  onFormChanges = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanges();

    onCleanup(() => {
      regionSubscription.unsubscribe();
    })
  })

  onRegionChanges() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => {
          this.myForm.controls['border'].setValue('');
          this.myForm.controls['country'].setValue('');
        }),
        tap(() => {
          this.countries.set([]);
          this.borders.set([]);
        }),
        switchMap((region) => {
          return this.countryService.getCountriesByRegion(region);
        })
      )
      .subscribe((countries) => {
        this.countries.set([...countries])
        console.log(this.countries())
      })
  }
}
