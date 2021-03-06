import {
  IIIFManifest,
  IIIFRendering,
  IIIFMetadata,
  IIIFCanvas,
  IIIFStructure,
  IIIFMediaElement,
  Service,
  AuthService,
  AuthServiceService,
  IIIFAnnotationResource,
  IIIFThumbnailService,
} from '../model/iiif';
import { fetchJson } from '../utils/http';
import cloneDeep from 'lodash.clonedeep';

export function getServiceId(canvas?: IIIFCanvas): string | undefined {
  const serviceSrc = canvas?.images[0]?.resource?.service;
  if (serviceSrc) {
    if (Array.isArray(serviceSrc)) {
      const service = serviceSrc.find(
        item => item['@context'] === 'http://iiif.io/api/image/2/context.json'
      );
      return service && service['@id'];
    } else {
      return serviceSrc['@id'];
    }
  }
}

export function getAuthService(
  iiifManifest?: IIIFManifest
): AuthService | undefined {
  if (iiifManifest && iiifManifest.service) {
    if (Array.isArray(iiifManifest.service)) {
      const authServices = iiifManifest.service
        .filter(service => !!service.authService)
        .map(service => service?.authService);
      const restrictedService = authServices.find(
        service =>
          service?.['@id'] ===
          'https://iiif.wellcomecollection.org/auth/restrictedlogin'
      );
      const nonRestrictedService = authServices.find(
        service =>
          service?.['@id'] !==
          'https://iiif.wellcomecollection.org/auth/restrictedlogin'
      );
      // If there is a mixture of restricted images and non restricted images, we show the auth service of the non restricted ones, 'e.g. open with advisory', as these can still be viewd.
      // Individual images that are restricted won't be displayed anyway.
      return nonRestrictedService || restrictedService;
    } else {
      return iiifManifest.service.authService;
    }
  }
}

export function getMediaClickthroughService(
  media: IIIFMediaElement
): AuthService | undefined {
  if (media?.service) {
    if (Array.isArray(media.service)) {
      return media.service.find(
        service =>
          service.profile === 'http://iiif.io/api/auth/0/clickthrough' ||
          service.profile === 'http://iiif.io/api/auth/1/clickthrough'
      );
    } else {
      if (
        media.service.profile === 'http://iiif.io/api/auth/0/clickthrough' ||
        media.service.profile === 'http://iiif.io/api/auth/1/clickthrough'
      ) {
        return media.service;
      }
    }
  }
}

export function getTokenService(
  authService: AuthService
): AuthServiceService | undefined {
  const authServiceServices = authService?.service || [];
  return authServiceServices.find(
    service =>
      service.profile === 'http://iiif.io/api/auth/0/token' ||
      service.profile === 'http://iiif.io/api/auth/1/token'
  );
}

export function getImageAuthService(canvas: IIIFCanvas): AuthService | null {
  const serviceArray = canvas?.images?.[0]?.resource?.service?.[0]?.service;
  const authService =
    serviceArray &&
    serviceArray.find(
      service =>
        service['@context'] === 'http://iiif.io/api/auth/0/context.json'
    );
  return authService || null;
}

export function isImageRestricted(canvas: IIIFCanvas): boolean {
  const imageAuthService = getImageAuthService(canvas);
  return Boolean(
    imageAuthService?.['@id'] ===
      'https://iiif.wellcomecollection.org/auth/restrictedlogin'
  );
}

export function getUiExtensions(
  iiifManifest: IIIFManifest
): Service | undefined {
  if (iiifManifest.service) {
    if (
      !Array.isArray(iiifManifest.service) &&
      iiifManifest.service.profile ===
        'http://universalviewer.io/ui-extensions-profile'
    ) {
      return iiifManifest.service;
    } else if (Array.isArray(iiifManifest.service)) {
      return iiifManifest.service.find(
        service =>
          service.profile === 'http://universalviewer.io/ui-extensions-profile'
      );
    }
  }
}

export function isUiEnabled(
  uiExtensions: Service | undefined,
  uiName: string
): boolean {
  const disableUI = uiExtensions && uiExtensions.disableUI;
  if (disableUI) {
    return !(
      disableUI.includes(uiName) || disableUI.includes(uiName.toLowerCase())
    );
  }
  return true;
}

export function getIIIFMetadata(
  iiifManifest: IIIFManifest,
  label: string
): IIIFMetadata | undefined {
  return iiifManifest.metadata.find(data => data.label === label);
}

export function getDownloadOptionsFromManifest(
  iiifManifest: IIIFManifest
): IIIFRendering[] {
  const sequence = iiifManifest.sequences?.find(
    sequence => sequence['@type'] === 'sc:Sequence'
  );
  const sequenceRendering = sequence?.rendering ?? [];
  const sequenceRenderingArray: IIIFRendering[] = Array.isArray(
    sequenceRendering
  )
    ? sequenceRendering
    : [sequenceRendering];

  const pdfRenderingArray: IIIFRendering[] = iiifManifest.mediaSequences
    ? iiifManifest.mediaSequences.reduce((acc: IIIFRendering[], sequence) => {
        return acc.concat(
          sequence.elements
            .map(element => {
              return {
                '@id': element['@id'],
                format: element.format,
                label: `Download ${
                  element.format === 'application/pdf' ? 'PDF' : 'file'
                }`,
                width: element.width,
              };
            })
            .filter(Boolean)
        );
      }, [])
    : [];
  return [...sequenceRenderingArray, ...pdfRenderingArray].filter(Boolean);
}

export function getCanvases(iiifManifest: IIIFManifest): IIIFCanvas[] {
  const sequence =
    iiifManifest.sequences &&
    iiifManifest.sequences.find(
      sequence =>
        sequence['@type'] === 'sc:Sequence' &&
        sequence.compatibilityHint !== 'displayIfContentUnsupported'
    );
  return sequence ? sequence.canvases : [];
}

export function getStructures(iiifManifest: IIIFManifest): IIIFStructure[] {
  return iiifManifest?.structures || [];
}

// When lots of the works were digitised, structures with multiple pages such as table of contents
// were created individually, rather than as a single structure with a range of pages.
// This means we will often display repetitive links to the essentially the same thing.
// Until we can improve the data at source, this function groups structures that have the same label attached to consecutive pages into a single structure.
export function groupStructures(
  canvases: IIIFCanvas[],
  structures: IIIFStructure[]
): IIIFStructure[] {
  const clonedStructures = cloneDeep(structures);
  return clonedStructures.reduce(
    (acc, structure) => {
      const [lastCanvasInRange] = structure.canvases.slice(-1);
      const [firstCanvasInRange] = structure.canvases;
      const firstCanvasIndex = canvases.findIndex(
        canvas => canvas['@id'] === firstCanvasInRange
      );
      if (
        acc.previousLabel === structure.label &&
        firstCanvasIndex === acc.previousLastCanvasIndex + 1
      ) {
        acc.groupedArray[acc.groupedArray.length - 1].canvases.push(
          lastCanvasInRange
        );
      } else if (structure.canvases.length > 0) {
        acc.groupedArray.push(structure);
      }
      acc.previousLabel = structure.label;
      acc.previousLastCanvasIndex = canvases.findIndex(
        canvas => canvas['@id'] === lastCanvasInRange
      );
      return acc;
    },
    {
      previousLastCanvasIndex: null,
      previousLabel: null,
      groupedArray: [],
    }
  ).groupedArray;
}

export function getVideo(
  iiifManifest: IIIFManifest
): IIIFMediaElement | undefined {
  const videoSequence =
    iiifManifest &&
    iiifManifest.mediaSequences &&
    iiifManifest.mediaSequences.find(sequence =>
      sequence.elements.find(
        element => element['@type'] === 'dctypes:MovingImage'
      )
    );
  return (
    videoSequence &&
    videoSequence.elements.find(
      element => element['@type'] === 'dctypes:MovingImage'
    )
  );
}

export function getAudio(
  iiifManifest: IIIFManifest
): IIIFMediaElement | undefined {
  const videoSequence =
    iiifManifest &&
    iiifManifest.mediaSequences &&
    iiifManifest.mediaSequences.find(sequence =>
      sequence.elements.find(element => element['@type'] === 'dctypes:Sound')
    );
  return (
    videoSequence &&
    videoSequence.elements.find(element => element['@type'] === 'dctypes:Sound')
  );
}

export function getAnnotationFromMediaElement(
  mediaElement: IIIFMediaElement
): IIIFAnnotationResource | undefined {
  return (
    mediaElement.resources &&
    mediaElement.resources.find(
      resource => resource['@type'] === 'oa:Annotation'
    )
  );
}

export function getFirstChildManifestLocation(
  iiifManifest: IIIFManifest
): string | undefined {
  if (iiifManifest.manifests) {
    return iiifManifest.manifests.find(manifest => manifest['@id'])['@id'];
  }
}

export function getIIIFPresentationCredit(
  manifest: IIIFManifest
): string | undefined {
  const attribution = getIIIFMetadata(manifest, 'Attribution');
  return attribution?.value.split('<br/>')[0];
}

export function getSearchService(manifest: IIIFManifest): Service | undefined {
  if (Array.isArray(manifest.service)) {
    return manifest.service.find(
      service =>
        service['@context'] === 'http://iiif.io/api/search/0/context.json'
    );
  } else if (
    manifest.service?.['@context'] ===
    'http://iiif.io/api/search/0/context.json'
  ) {
    return manifest.service;
  }
}

// This is necessary while we are in the process of switching the source of the iiif presentation manifests
// There is a slight (temporary) difference between the manifest served from wellcomelibrary.org
// and the one served from iiif.wellcomecollection.org
// In the former canvas.thumbnail.service is an object and in the latter it is an array.
export function getThumbnailService(
  canvas: IIIFCanvas
): IIIFThumbnailService | undefined {
  const service = canvas?.thumbnail?.service;
  if (Array.isArray(service)) {
    return service[0];
  } else {
    return service;
  }
}

export async function getIIIFManifest(url: string): Promise<IIIFManifest> {
  const manifest = await fetchJson(url);
  return manifest;
}
