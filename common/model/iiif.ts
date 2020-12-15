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
  service: IIIFThumbnailService;
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

export type IIIFRendering = {
  '@id': string;
  format: string;
  label: string;
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
type IIIFStructure = {
  '@id': string;
  '@type': string;
  label: string;
  canvases: string[];
};

export type IIIFMetadata = {
  label: string;
  value: string;
};

export type AuthService = {
  '@context': string;
  '@id': string;
  accessHint: string;
  authService: {
    '@context': string;
    '@id': string;
    description: string;
    label: string;
    profile: string;
    service: [];
  };
  service: Service[];
  profile: string;
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