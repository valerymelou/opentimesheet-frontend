import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonApiService } from '../core/api/json-api.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends JsonApiService<Project> {

  constructor(protected http: HttpClient) {
    super(http, Project, '/projects/');
  }
}
