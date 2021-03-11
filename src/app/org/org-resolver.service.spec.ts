import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { OrgResolverService } from './org-resolver.service';
import { OrgService } from './org.service';

describe('OrgResolverService', () => {
  let service: OrgResolverService;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let routerSpy: jasmine.SpyObj<Router>;
  let orgServiceSpy: jasmine.SpyObj<OrgService>;

  beforeEach(() => {
    const orgServiceMock = jasmine.createSpyObj('OrgService', ['checkOrg']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRouteSnapshot, useValue: {paramMap: convertToParamMap({slug: 'test'})}},
        { provide: RouterStateSnapshot, useValue: {}},
        OrgResolverService,
        { provide: OrgService, useValue: orgServiceMock }
      ]
    });

    service = TestBed.inject(OrgResolverService);
    route = TestBed.inject(ActivatedRouteSnapshot);
    state = TestBed.inject(RouterStateSnapshot);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    orgServiceSpy = TestBed.inject(OrgService) as jasmine.SpyObj<OrgService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve with the slug in paramMap', () => {
    orgServiceSpy.checkOrg.and.returnValue(of({data: null}));
    service.resolve(route, state).subscribe(result => {
      expect(result).toBe('test');
    });
  });

  it('should navigate to start if checkOrg returns untruth value', () => {
    orgServiceSpy.checkOrg.and.returnValue(of(false));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    service.resolve(route, state).subscribe();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/start']);
  });

  it('should navigate to start if checkOrg fails', () => {
    orgServiceSpy.checkOrg.and.returnValue(throwError({}));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    service.resolve(route, state).subscribe();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/start']);
  });
});
