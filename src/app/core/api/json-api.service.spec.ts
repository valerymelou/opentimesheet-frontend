import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseModel } from '../base-model';
import { JsonApiService } from './json-api.service';
import { Results } from './results';
import { Serializable } from './serializable';

export class Resource extends BaseModel implements Serializable<Resource> {
  type = 'Project';
  name?: string;
  description?: string;
  status?: string;

  deserialize(data: any): Resource {
    if (data && data.attributes) {
      const attributes = data.attributes;
      this.id = data.id;
      this.name = attributes.name;
      this.description = attributes.description;
      this.status = attributes.status;
    }

    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends JsonApiService<Resource> {

  constructor(protected http: HttpClient) {
    super(http, Resource, '/resources/');
  }
}

describe('JsonApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ResourceService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of resources', () => {
    const response = {
      links: {
        first: 'http://localhost/resources/?pageNumber=1',
        last: 'http://localhost/resources/?pageNumber=1',
        next: null,
        prev: null
      },
      data: [
        {
          type: 'Resource',
          id: 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5',
          attributes: {
            name: 'Resource 1',
            description: 'This is the first resource',
            status: 'ACTIVE',
          }
        },
        {
          type: 'Resource',
          id: 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5',
          attributes: {
            name: 'Resource 2',
            description: 'This is the second resource',
            status: 'ACTIVE',
          }
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pages: 1,
          count: 2
        }
      }
    };

    service.getList().subscribe((results: Results<Resource>) => {
      expect(results.pagination.count).toBe(2);
      expect(results.pagination.page).toBe(1);
      expect(results.pagination.pages).toBe(1);
      expect(results.data[0] instanceof Resource);
    });

    const req = httpTestingController.expectOne('/resources/');
    expect(req.request.method).toEqual('GET');

    req.flush(response);
    httpTestingController.verify();
  });

  it('should return a single resource', () => {
    const response = {
      data: {
        type: 'Resource',
        id: 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5',
        attributes: {
          name: 'Resource 1',
          description: 'This is the first resource',
          status: 'ACTIVE',
        }
      }
    };

    service.getById('e88e8ad0-eb0f-4fea-89cd-b3637a8024d5').subscribe((resource: Resource) => {
      expect(resource.name).toBe('Resource 1');
      expect(resource.description).toBe('This is the first resource');
      expect(resource.status).toBe('ACTIVE');
    });

    const req = httpTestingController.expectOne('/resources/e88e8ad0-eb0f-4fea-89cd-b3637a8024d5/');
    expect(req.request.method).toEqual('GET');

    req.flush(response);
    httpTestingController.verify();
  });

  it('should create a resource', () => {
    const response = {
      data: {
        type: 'Resource',
        id: 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5',
        attributes: {
          name: 'Resource 1',
          description: 'This is the first resource',
          status: 'ACTIVE',
        }
      }
    };

    const resource: Resource = new Resource();
    resource.type = 'Resource';
    resource.description = 'This is the first resource';
    resource.name = 'Resource 1';
    resource.status = 'ACTIVE';

    service.create(resource).subscribe((result: Resource) => {
      expect(result.id).toBe('e88e8ad0-eb0f-4fea-89cd-b3637a8024d5');
      expect(result.name).toBe('Resource 1');
      expect(result.description).toBe('This is the first resource');
      expect(result.status).toBe('ACTIVE');
    });

    const req = httpTestingController.expectOne('/resources/');
    expect(req.request.method).toEqual('POST');

    req.flush(response);
    httpTestingController.verify();
  });

  it('should update a resource', () => {
    const response = {
      data: {
        type: 'Resource',
        id: 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5',
        attributes: {
          name: 'Resource',
          description: 'This is the resource',
          status: 'ACTIVE',
        }
      }
    };

    const resource: Resource = new Resource();
    resource.id = 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5';
    resource.type = 'Resource';
    resource.description = 'This is the first resource';
    resource.name = 'Resource 1';
    resource.status = 'ACTIVE';

    service.update(resource).subscribe((result: Resource) => {
      expect(result.name).toBe('Resource');
      expect(result.description).toBe('This is the resource');
      expect(result.status).toBe('ACTIVE');
    });

    const req = httpTestingController.expectOne('/resources/e88e8ad0-eb0f-4fea-89cd-b3637a8024d5/');
    expect(req.request.method).toEqual('PATCH');

    req.flush(response);
    httpTestingController.verify();
  });

  it('should delete a resource', () => {
    const resource: Resource = new Resource();
    resource.id = 'e88e8ad0-eb0f-4fea-89cd-b3637a8024d5';

    service.delete(resource).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('/resources/e88e8ad0-eb0f-4fea-89cd-b3637a8024d5/');
    expect(req.request.method).toEqual('DELETE');

    req.flush(null);
    httpTestingController.verify();
  });
});
