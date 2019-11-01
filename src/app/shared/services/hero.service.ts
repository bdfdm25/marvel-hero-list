import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Routes } from '../helpers/routes.helper';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getHeroes(): Observable<any> {
    this.spinner.show();
    return this.http
      .get(Routes.HEROES)
      .pipe(finalize(() => this.spinner.hide()));
  }

  getHeroById(id: number | string): Observable<any> {
    this.spinner.show();
    return this.http
      .get(Routes.HERO_BY_ID(id))
      .pipe(finalize(() => this.spinner.hide()));
  }
}
