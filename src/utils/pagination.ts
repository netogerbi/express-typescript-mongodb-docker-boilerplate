export interface IPagination {
  limit?: number;
  offset?: number;
}

export default class Pagination {
  public limit: number;
  public offset: number;

  constructor({ limit = 10, offset = 0 }: IPagination) {
    this.limit = limit;
    this.offset = offset < 0 ? 0 : offset;
  }
}
