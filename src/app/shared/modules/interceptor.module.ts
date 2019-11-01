import { NgModule, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

import md5 from 'md5';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private PUBLIC_KEY = '1743d41b2551f478559762866b41c308';
  private PRIVATE_KEY = '3485ed6f0a7ad1ed3735c1fbf19c8a56a496402e';
  private timeStamp: Date = new Date();
  private params = new HttpParams()
    .set('ts', this.timeStamp.getMilliseconds().toString())
    .set('apikey', this.PUBLIC_KEY)
    .set('hash', this.genHash());

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      params: this.params
    });
    return next.handle(dupReq);
  }

  private genHash(): string {
    const ts = this.timeStamp.getMilliseconds();
    const hash = md5(ts + this.PRIVATE_KEY + this.PUBLIC_KEY);
    return hash;
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class InterceptorModule {}
