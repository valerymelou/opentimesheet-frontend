import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrgService } from 'src/app/org/org.service';
import { environment } from 'src/environments/environment';

import { HttpBaseUrlInterceptor } from './http-base-url.interceptor';

describe('HttpBaseUrlInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let orgServiceSpy: jasmine.SpyObj<OrgService>;

  beforeEach(() => {
    const orgServiceMock = jasmine.createSpyObj('OrgService', ['getCurrentOrgCode']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBaseUrlInterceptor,
          multi: true
        },
        { provide: OrgService, useValue: orgServiceMock }
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    orgServiceSpy = TestBed.inject(OrgService) as jasmine.SpyObj<OrgService>;
  });

  it('should not modify URLs starting with http', () => {
    client.get('https://api.github.com/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.url).toBe('https://api.github.com/');
  });

  it('should add API Root endpoint without organization prefix', () => {
    orgServiceSpy.getCurrentOrgCode.and.returnValue('');
    client.get('/check-organization/test').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.url).toBe(`${environment.apiRoot}/check-organization/test`);
  });

  it('should add organization prefix', () => {
    orgServiceSpy.getCurrentOrgCode.and.returnValue('test');
    client.get('/organization').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.url).toBe(`${environment.apiRoot}/${environment.apiOrgPrefix}/test/organization`);
  });
});
