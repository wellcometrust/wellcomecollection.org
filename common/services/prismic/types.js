// @flow
export type Document = {|
  id: string;
  uid ?: string;
  type: string;
  href: string;
  tags: string[];
  slug: string;
  slugs: string[];
  lang ?: string;
  alternateLanguages: string[];
  firstPublicationDate: Date | null;
  lastPublicationDate: Date | null;
  data: any;
|}

export type PrismicQueryOpts = {|
  fetchLinks?: string[],
  page?: number,
  orderings?: string
|}
