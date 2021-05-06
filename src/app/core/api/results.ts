import { Pagination } from './pagination';

export class Results<T> {
  public included?: [];
  public data: T[] = [];
  public pagination: Pagination = new Pagination();
}
