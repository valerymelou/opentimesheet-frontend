import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrgService } from 'src/app/org/org.service';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {

  constructor(private orgService: OrgService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('http') || request.url.indexOf('/assets/i18n/') !== -1) {
      return next.handle(request);
    }

    let url = request.url;
    const code = this.orgService.getCurrentOrgCode();

    if (code !== '') {
      url = `${environment.apiRoot}/${environment.apiOrgPrefix}/${code}${request.url}`;
    } else {
      url = `${environment.apiRoot}${request.url}`;
    }

    request = request.clone({url});

    return next.handle(request);
  }
}
