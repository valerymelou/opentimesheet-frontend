export class HttpErrorSource {
  public pointer?: string;
}

export class HttpError {
  public source?: HttpErrorSource;

  constructor(public code?: string, public detail?: string, public status?: string) {}

  static fromErrors(errors: any[]): HttpError[] {
    const httpErrors: HttpError[] = [];
    errors.forEach(error => {
      const httpError = new HttpError(error.code, error.detail, error.status);

      if (error.source) {
        const source = new HttpErrorSource();
        source.pointer = error.source.pointer;
        httpError.source = source;
      }

      httpErrors.push(httpError);
    });

    return httpErrors;
  }
}
