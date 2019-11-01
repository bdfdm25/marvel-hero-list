import { HeroService } from './services/hero.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorModule } from './modules/interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    InterceptorModule
  ],
  exports: [
    NgxSpinnerModule,
  ],
  providers: [
    HeroService
  ]
})
export class SharedModule { }
