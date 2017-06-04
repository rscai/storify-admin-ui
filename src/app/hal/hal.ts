export class Link {
  href: string;
}

export class Links {
  [text: string]: Link;
}

export class HalJson {
  _links: Links
}
export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
export class Embedded<T> {
  [text: string]: [T];
}
export class HalCollection<T> extends HalJson{
  _embedded: Embedded<T>;
  page: Page;
}
