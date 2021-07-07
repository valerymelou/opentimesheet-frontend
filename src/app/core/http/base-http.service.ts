import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpError } from './http-error';

export class BaseHttpService {
  protected handleError(error: HttpErrorResponse): Observable<HttpError[] | any> {
    let httpErrors: HttpError[] = [];

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      const httpError = new HttpError('', error.error.message, '0');
      httpErrors.push(httpError);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.error.errors) {
        httpErrors = HttpError.fromErrors(error.error.errors);
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(httpErrors);
  }
}
