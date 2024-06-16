export type SearchQuery<T> = {
  [Property in keyof T]: string;
};
