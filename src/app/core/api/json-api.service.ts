import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseModel } from '../base-model';
import { BaseHttpService } from '../http/base-http.service';
import { Pagination } from './pagination';
import { Results } from './results';
import { Serializable } from './serializable';

export class JsonApiService<T extends BaseModel & Serializable<T>> extends BaseHttpService {
  constructor(protected http: HttpClient, protected readonly type: new () => T , protected readonly url: string) {
    super();
  }

  getList(query?: {[key: string]: string}): Observable<Results<T>> {
    const params = new HttpParams({ fromObject: query });

    return this.http.get<Results<T>>(this.url, { params }).pipe(
      map((response: any) => {
        const results = new Results<T>();
        const pagination = new Pagination();
        pagination.count = response.meta.pagination.count;
        pagination.page = response.meta.pagination.page;
        pagination.pages = response.meta.pagination.pages;
        pagination.first = response.links.first;
        pagination.last = response.links.last;
        pagination.next = response.links.next;
        pagination.previous = response.links.prev;
        results.pagination = pagination;

        response.data.forEach((data: any) => {
          const object = new this.type();
          results.data.push(object.deserialize(data));
        });

        return results;
      }),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}${id}/`).pipe(
      map((response: any) => {
        const object = new this.type();

        object.deserialize(response.data);
        return object;
      }),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(`${this.url}`, resource.serialize()).pipe(
      map((response: any) => {
        const object = new this.type();

        object.deserialize(response.data);
        return object;
      }),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    return this.http.patch<T>(`${this.url}${resource.id}/`, resource.serialize()).pipe(
      map((response: any) => {
        const object = new this.type();

        object.deserialize(response.data);
        return object;
      }),
      catchError(this.handleError)
    );
  }

  delete(resource: T): Observable<null> {
    return this.http.delete<null>(`${this.url}${resource.id}/`).pipe(
      map((response: any) => {
        return null;
      }),
      catchError(this.handleError)
    );
  }
}
