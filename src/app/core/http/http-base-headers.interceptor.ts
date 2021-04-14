import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpBaseHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('http')) {
      let headers = request.headers.set('Content-Type', environment.apiContentType);
      headers = headers.set('Accept', `${environment.apiContentType}; version=${environment.apiVersion}`);

      const apiRequest = request.clone({headers});

      return next.handle(apiRequest);
    }

    return next.handle(request);
  }
}
