import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('http')) {
      if (this.auth.isFullyAuthenticated()) {
        let headers = request.headers.set('Authorization', `Bearer ${this.auth.getAccessToken()}`);

        const apiRequest = request.clone({headers});

        return next.handle(apiRequest);
      }
    }

    return next.handle(request);
  }
}
