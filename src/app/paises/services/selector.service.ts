import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais, PaisFronteras } from '../interfaces/Pais.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  private URI: string = 'https://restcountries.com/v3.1'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  constructor(private http: HttpClient) { }

  get regiones(): string[] {
    return [...this._regiones]
  }

  getPaisesPorRegion(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.URI}/region/${region}?fields=name,cioc`)
  }

  getFronterasPorPaises(code: string): Observable<PaisFronteras[]> {
    return this.http.get<PaisFronteras[]>(`${this.URI}/alpha?codes=${code}&fields=borders`)
  }
}
