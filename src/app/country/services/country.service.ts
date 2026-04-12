import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';

type IRegion = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private httpClient = inject(HttpClient);


  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: IRegion): Observable<ICountry[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.httpClient.get<ICountry[]>(url)
  }

  getCountryByAlphaCode(alphaCode: string): Observable<ICountry> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.httpClient.get<ICountry>(url)
  }


}
