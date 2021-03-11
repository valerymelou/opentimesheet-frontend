import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrgService } from './org.service';

describe('OrgService', () => {
  let service: OrgService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OrgService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get/set current org code', () => {
    service.setCurrentOrgCode('test');

    expect(service.getCurrentOrgCode()).toEqual('test');
  });

  it('should make request to check organization', () => {
    const testData = {
      data: null
    };
    service.checkOrg('test').subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne('/check-organization/test');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
    httpTestingController.verify();
  });
});
