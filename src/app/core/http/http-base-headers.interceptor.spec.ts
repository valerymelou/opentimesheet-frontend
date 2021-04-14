import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { HttpBaseHeadersInterceptor } from './http-base-headers.interceptor';

describe('HttpBaseHeadersInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBaseHeadersInterceptor,
          multi: true
        }
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should not modify headers of requests starting with http', () => {
    client.get('https://api.github.com/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('Content-Type')).toEqual(null);
    expect(request.headers.get('Accept')).toEqual(null);
  });

  it('should set the content type and accept headers', () => {
    client.get('/check-organization/test').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('Content-Type')).toEqual(environment.apiContentType);
    expect(request.headers.get('Accept')).toEqual(`${environment.apiContentType}; version=${environment.apiVersion}`);
  });
});
