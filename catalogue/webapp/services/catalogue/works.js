// @flow
import fetch from 'isomorphic-unfetch';
import {
  type CatalogueResultsList,
  type CatalogueApiError,
  type Work,
  type CatalogueApiRedirect,
} from '@weco/common/model/catalogue';
import { type IIIFCanvas } from '@weco/common/model/iiif';
import Raven from 'raven-js';
import { serialiseUrl } from '@weco/common/services/catalogue/routes';
import { type CatalogueWorksApiProps } from '@weco/common/services/catalogue/api';
import { type Toggles, isomorphicGetApiOptions, rootUris } from './common';

type GetWorkProps = {|
  id: string,
  toggles?: Toggles,
|};

type GetWorksProps = {|
  params: CatalogueWorksApiProps,
  pageSize?: number,
  toggles?: Toggles,
|};

const worksIncludes = ['identifiers', 'production', 'contributors', 'subjects'];

const workIncludes = [
  'identifiers',
  'items',
  'subjects',
  'genres',
  'contributors',
  'production',
  'notes',
];

export async function getWorks({
  params,
  toggles,
  pageSize = 25,
}: GetWorksProps): Promise<CatalogueResultsList<Work> | CatalogueApiError> {
  const apiOptions = isomorphicGetApiOptions(toggles);
  if (apiOptions.indexOverrideSuffix) {
    params._index = `works-${apiOptions.indexOverrideSuffix}`;
  }
  const filterQueryString = Object.keys(serialiseUrl(params)).map(key => {
    const val = params[key];
    return `${key}=${encodeURIComponent(val)}`;
  });
  const url =
    `${rootUris[apiOptions.env]}/v2/works?include=${worksIncludes.join(',')}` +
    `&pageSize=${pageSize}` +
    (filterQueryString.length > 0 ? `&${filterQueryString.join('&')}` : '');
  try {
    const res = await fetch(url);
    const json = await res.json();

    return (json: CatalogueResultsList<Work> | CatalogueApiError);
  } catch (error) {
    return {
      description: '',
      errorType: 'http',
      httpStatus: 500,
      label: 'Internal Server Error',
      type: 'Error',
    };
  }
}

export async function getWork({
  id,
  toggles,
}: GetWorkProps): Promise<Work | CatalogueApiError | CatalogueApiRedirect> {
  const apiOptions = isomorphicGetApiOptions(toggles);
  let url = `${
    rootUris[apiOptions.env]
  }/v2/works/${id}?include=${workIncludes.join(',')}`;
  if (apiOptions.indexOverrideSuffix) {
    url += `&_index=works-${apiOptions.indexOverrideSuffix}`;
  }
  const res = await fetch(url, { redirect: 'manual' });

  // When records from Miro have been merged with Sierra data, we redirect the
  // latter to the former. This would happen quietly on the API request, but we
  // would then have duplicates emerging, which wouldn't be useful for search
  // engines so we respect the redirect on the client
  if (res.status === 301 || res.status === 302) {
    const id = res.headers.get('location').match(/works\/([^?].*)\?/);
    return {
      type: 'Redirect',
      status: res.status,
      redirectToId: id[1],
    };
  }

  const json = await res.json();

  return json;
}

export async function getCanvasOcr(canvas: IIIFCanvas) {
  const textContent =
    canvas.otherContent &&
    canvas.otherContent.find(
      content =>
        content['@type'] === 'sc:AnnotationList' &&
        content.label === 'Text of this page'
    );

  const textService = textContent && textContent['@id'];

  if (textService) {
    try {
      const textJson = await fetch(textService);
      const text = await textJson.json();
      const textString = text.resources
        .filter(resource => {
          return resource.resource['@type'] === 'cnt:ContentAsText';
        })
        .map(resource => resource.resource.chars)
        .join(' ');
      return textString.length > 0 ? textString : 'text unavailable';
    } catch (e) {
      Raven.captureException(new Error(`IIIF text service error: ${e}`), {
        tags: {
          service: 'dlcs',
        },
      });

      return 'text unavailable';
    }
  }
}
