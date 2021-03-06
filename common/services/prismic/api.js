// @flow
import Prismic from 'prismic-javascript';
import type {
  PrismicDocument,
  PrismicQueryOpts,
  PrismicApiSearchResponse,
  PaginatedResults,
  DocumentType,
} from './types';
import Cookies from 'cookies';

const apiUri = 'https://wellcomecollection.prismic.io/api/v2';

export function isPreview(req: ?Request): boolean {
  const cookies = req && new Cookies(req);
  return cookies
    ? Boolean(cookies.get('isPreview')) ||
        Boolean(cookies.get(Prismic.previewCookie))
    : false;
}

export async function getPrismicApi(req: ?Request) {
  if (req && isPreview(req)) {
    const api = await Prismic.getApi(apiUri, { req });
    return api;
  } else {
    const prismicApi = await Prismic.getApi(apiUri);
    return prismicApi;
  }
}

export async function getDocument(
  req: ?Request,
  id: string,
  opts: PrismicQueryOpts,
  memoizedPrismic: ?Object
): Promise<?PrismicDocument> {
  const prismicApi =
    memoizedPrismic && !isPreview(req)
      ? memoizedPrismic
      : await getPrismicApi(req);
  const doc = await prismicApi.getByID(id, opts);
  return doc;
}

type Predicate = string;

export async function getDocuments(
  req: ?Request,
  predicates: Predicate[],
  opts: PrismicQueryOpts,
  memoizedPrismic: ?Object
): Promise<PaginatedResults<PrismicDocument>> {
  const prismicApi =
    memoizedPrismic && !isPreview(req)
      ? memoizedPrismic
      : await getPrismicApi(req);
  const docs: PrismicApiSearchResponse = await prismicApi.query(
    predicates.concat([Prismic.Predicates.not('document.tags', ['delist'])]),
    // uncomment this and comment out the line above to show delisted content
    // predicates,
    opts
  );
  const paginatedResults = {
    currentPage: docs.page,
    pageSize: docs.results_per_page,
    totalResults: docs.total_results_size,
    totalPages: docs.total_pages,
    results: docs.results,
  };

  return paginatedResults;
}

export async function getTypeByIds(
  req: ?Request,
  types: DocumentType[],
  ids: string[],
  qOpts: {}
) {
  const prismic = await getPrismicApi(req);
  const doc = await prismic.getByIDs(ids, qOpts);

  return doc;
}
