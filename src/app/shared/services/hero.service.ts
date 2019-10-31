import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private API_ADDRESS = 'https://gateway.marvel.com:443/v1/public';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getAll(API_MODULE: string): Observable<any> {
    this.spinner.show();
    return this.http
      .get(this.API_ADDRESS + API_MODULE)
      .pipe(finalize(() => this.spinner.hide()));
  }

  getById(
    API_MODULE: string,
    ID: string,
    API_SUB_MODULE: string
  ): Observable<any> {
    this.spinner.show();
    return this.http
      .get(this.API_ADDRESS + API_MODULE + '/' + ID + API_SUB_MODULE)
      .pipe(finalize(() => this.spinner.hide()));
  }
}
