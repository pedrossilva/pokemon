export interface Pagination {
  count?: number;
  page?: number;
  limit?: number;
  offset?: number;
  next?: string;
  previous?: string;
  url?: string;
}

export interface Page {
  url?: string;
  pagination?: Pagination;
}
