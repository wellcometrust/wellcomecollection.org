export type IIIFImageServiceSize = {
  width: number;
  height: number;
};

export type IIIFImageService = {
  '@id': string;
};

export type IIIFThumbnailService = {
  '@id': string;
  sizes: IIIFImageServiceSize[];
};

export type IIIFThumbnail = {
  '@id': string;
  service: IIIFThumbnailService | IIIFThumbnailService[];
};

export type IIIFResource = {
  '@id': string;
  service:
    | {
        '@id': string;
      }
    | {
        '@id': string;
        '@context': string;
        service: [];
      }[];
};

export type IIIFImage = {
  resource: IIIFResource;
};

export type IIIFCanvas = {
  '@id': string;
  thumbnail: IIIFThumbnail;
  label: string;
  images: IIIFImage[];
  width: number;
  height: number;
  otherContent: any[];
};

export type IIIFStructure = {
  '@id': string;
  '@type': string;
  label: string;
  canvases: string[];
};

export type IIIFRendering = {
  '@id': string;
  format: string;
  label: string;
  width?: 'full' | number;
};

export type IIIFAnnotationResource = {
  '@type': 'oa:Annotation';
  resource: {
    '@id': string;
    format: string;
    label: string;
  };
};

export type IIIFMediaElement = {
  '@id': string;
  '@type': 'dctypes:Sound' | 'dctypes:MovingImage';
  format: string;
  label: string;
  metadata: [];
  thumbnail: string;
  rendering: {
    '@id': string;
    format: string;
  };
  height?: number;
  width?: number;
  resources?: IIIFAnnotationResource[];
  service?: AuthService | AuthService[];
};

type IIIFMediaSequence = {
  '@id': string;
  '@type': string;
  elements: IIIFMediaElement[];
};

export type IIIFSequence = {
  '@id': string;
  '@type': string;
  compatibilityHint: string;
  canvases: IIIFCanvas[];
  rendering: IIIFRendering[];
};

export type IIIFMetadata = {
  label: string;
  value: string;
};

export type AuthServiceService = {
  '@context': string;
  '@id': string;
  profile: string;
};

export type AuthService = {
  '@context': string;
  '@id': string;
  description: string;
  label: string;
  profile: string;
  service: AuthServiceService[];
};

export type Service = {
  profile: string;
  disableUI?: string[];
  authService?: AuthService;
};

export type IIIFManifest = {
  '@id': string;
  label: string;
  manifests: any; // TODO
  metadata: IIIFMetadata[];
  mediaSequences?: IIIFMediaSequence[];
  sequences?: IIIFSequence[];
  structures?: IIIFStructure[];
  license: string;
  within?: string;
  service?: Service | Service[];
};

export type SearchService = {
  '@context': string;
  '@id': string;
  profile: string;
  label: string;
};

export type SearchResults = {
  '@context': string;
  '@id': string;
  '@type': string;
  within: {
    '@type': string;
    total: number | null;
  };
  startIndex: number;
  resources: {
    '@id': string;
    '@type': 'oa:Annotation';
    motivation: string;
    resource: {
      '@type': string;
      chars: string;
    };
    on: string;
  }[];
  hits: {
    '@type': string;
    annotations: string[];
    match: string;
    before: string;
    after: string;
  }[];
};
