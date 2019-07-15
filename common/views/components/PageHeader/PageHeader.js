// @flow

import { font, spacing, classNames } from '../../../utils/classnames';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import LabelsList from '../LabelsList/LabelsList';
import { UiImage } from '../Images/Images';
import VideoEmbed from '../VideoEmbed/VideoEmbed';
import Picture from '../Picture/Picture';
import HeaderBackground from '../HeaderBackground/HeaderBackground';
import FreeSticker from '../FreeSticker/FreeSticker';
import HighlightedHeading from '../HighlightedHeading/HighlightedHeading';
import Layout10 from '../Layout10/Layout10';
import WobblyBottom from '../WobblyBottom/WobblyBottom';
import { breakpoints } from '../../../utils/breakpoints';
import type { Node, Element, ElementProps } from 'react';
import type { GenericContentFields } from '../../../model/generic-content-fields';
import VerticalSpace from '../styled/VerticalSpace';
import styled from 'styled-components';

// TODO: use spacings from theme
const HeroPictureBackground = styled.div`
  height: 50%;
  width: 100%;
  bottom: -30px;

  ${props => props.theme.media.medium`
    bottom: -46px;
  `}

  ${props => props.theme.media.large`
    bottom: -64px;
  `}
`;

export type FeaturedMedia =
  | Element<typeof UiImage>
  | Element<typeof VideoEmbed>
  | Element<typeof Picture>;

type BackgroundType = Element<typeof HeaderBackground>;

export function getFeaturedMedia(
  fields: GenericContentFields,
  isPicture?: boolean
): ?FeaturedMedia {
  const image = fields.promo && fields.promo.image;
  const { squareImage, widescreenImage } = fields;
  const { body } = fields;
  const tasl = image && {
    title: image.title,
    author: image.author,
    sourceName: image.source && image.source.name,
    sourceLink: image.source && image.source.link,
    license: image.license,
    copyrightHolder: image.copyright && image.copyright.holder,
    copyrightLink: image.copyright && image.copyright.link,
  };
  const hasFeaturedVideo = body.length > 0 && body[0].type === 'videoEmbed';
  const FeaturedMedia = hasFeaturedVideo ? (
    <VideoEmbed {...body[0].value} />
  ) : isPicture && widescreenImage && squareImage ? (
    <Picture
      images={[
        { ...widescreenImage, minWidth: breakpoints.medium },
        { ...squareImage, minWidth: null },
      ]}
      isFull={true}
    />
  ) : widescreenImage && tasl ? (
    <UiImage tasl={tasl} {...widescreenImage} sizesQueries="" />
  ) : image && tasl ? (
    <UiImage tasl={tasl} {...image} sizesQueries="" />
  ) : null;

  return FeaturedMedia;
}

export function getHeroPicture(
  fields: GenericContentFields
): ?Element<typeof Picture> {
  const { squareImage, widescreenImage } = fields;
  return (
    squareImage &&
    widescreenImage && (
      <Picture
        images={[
          { ...widescreenImage, minWidth: breakpoints.medium },
          { ...squareImage, minWidth: null },
        ]}
        isFull={true}
      />
    )
  );
}

type Props = {|
  breadcrumbs: ElementProps<typeof Breadcrumb>,
  labels: ?ElementProps<typeof LabelsList>,
  title: string,
  ContentTypeInfo: ?Node,
  Background: ?BackgroundType,
  FeaturedMedia: ?FeaturedMedia,
  HeroPicture: ?Element<typeof Picture>,
  isFree?: boolean,
  heroImageBgColor?: 'white' | 'cream',
  backgroundTexture?: ?string,
  highlightHeading?: boolean,
  asyncBreadcrumbsRoute?: string,

  // TODO: Don't overload this, it's just for putting things in till
  // we find a pattern
  TitleTopper?: Node,
|};

const PageHeader = ({
  breadcrumbs,
  labels,
  title,
  ContentTypeInfo,
  Background,
  HeroPicture,
  FeaturedMedia,
  isFree = false,
  // Not a massive fan of this, but it feels overkill to make a new component
  // for it as it's only used on articles and exhibitions
  heroImageBgColor = 'white',
  backgroundTexture,
  highlightHeading,
  asyncBreadcrumbsRoute,
  TitleTopper,
}: Props) => {
  const Heading = highlightHeading ? (
    <HighlightedHeading text={title} />
  ) : (
    <h1 className="h1 inline-block no-margin">{title}</h1>
  );

  return (
    <div
      className={`row relative`}
      style={{
        backgroundImage: backgroundTexture ? `url(${backgroundTexture})` : null,
        backgroundSize: backgroundTexture ? '150%' : null,
      }}
    >
      {Background}
      <Layout10>
        {isFree && (
          <div className="relative">
            <FreeSticker />
          </div>
        )}
        <VerticalSpace size="l" properties={['margin-top', 'margin-bottom']}>
          <VerticalSpace size="m">
            {!asyncBreadcrumbsRoute && <Breadcrumb {...breadcrumbs} />}
            {asyncBreadcrumbsRoute && (
              <div
                data-component="AsyncBreadcrumb"
                className="async-content breadcrumb-placeholder"
                data-endpoint={asyncBreadcrumbsRoute}
                data-prefix-endpoint="false"
                data-modifiers=""
              >
                <Breadcrumb {...breadcrumbs} />
              </div>
            )}
          </VerticalSpace>
          <VerticalSpace size="xs">
            {TitleTopper}
            {Heading}
          </VerticalSpace>

          {ContentTypeInfo && (
            <VerticalSpace
              size="m"
              className={classNames({
                [font({ s: 'HNL4', m: 'HNL3' })]: true,
              })}
            >
              {ContentTypeInfo}
            </VerticalSpace>
          )}

          {labels && labels.labels.length > 0 && <LabelsList {...labels} />}
        </VerticalSpace>
        <div className="relative">{FeaturedMedia}</div>
      </Layout10>

      {HeroPicture && (
        <div
          className={classNames({
            relative: true,
          })}
          style={{ height: '100%' }}
        >
          <HeroPictureBackground
            className={`bg-${heroImageBgColor} absolute`}
          />

          <div
            style={{ maxWidth: '1450px' }}
            className={classNames({
              'margin-h-auto': true,
              [spacing({ m: 4 }, { padding: ['left', 'right'] })]: true,
            })}
          >
            <WobblyBottom color={heroImageBgColor}>{HeroPicture}</WobblyBottom>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
