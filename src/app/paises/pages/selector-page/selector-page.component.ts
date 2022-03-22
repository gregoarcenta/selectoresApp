import { SelectorService } from './../../services/selector.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais, PaisFronteras } from '../../interfaces/Pais.interface';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  regiones: string[] = []
  paises: Pais[] = []
  fronteras?: PaisFronteras

  selectForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private paisesService: SelectorService
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    this.selectForm.get('region')?.valueChanges
      .pipe(
        tap(_ => this.selectForm.get('pais')?.reset('')),
        switchMap(region => {
          if (region !== '') {
            return this.paisesService.getPaisesPorRegion(region)
          }
          this.paises = []
          return []
        })
      )
      .subscribe(paises => this.paises = paises)

    this.selectForm.get('pais')?.valueChanges
      .pipe(
        tap(_ => this.selectForm.get('frontera')?.reset('')),
        switchMap(codePais => {
          if (codePais !== '') {
            return this.paisesService.getFronterasPorPaises(codePais)
          }
          this.fronteras = undefined
          return []
        })
      )
      .subscribe((borders) => {
        this.fronteras = borders[0]
      })
  }

  guardar() {
    if (this.selectForm.invalid) {
      console.log('ERROR: Formulario no valido');
    } else {
      console.log('Guardando...', this.selectForm.value);
      this.selectForm.reset({
        region: '',
        pais: ''
      })
    }
  }

}
