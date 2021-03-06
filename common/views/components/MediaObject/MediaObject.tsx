import { FunctionComponent, ReactElement } from 'react';
import Image from '../Image/Image';
import MediaObjectBase, {
  HasImageProps,
} from '../MediaObjectBase/MediaObjectBase';
import { ImageType } from '../../../model/image';
import PrismicHtmlBlock from '../PrismicHtmlBlock/PrismicHtmlBlock';
import { HTMLString } from '@weco/common/services/prismic/types';
import styled from 'styled-components';
import { grid, classNames, font } from '../../../utils/classnames';

export type Props = {
  title: string;
  text: HTMLString | null;
  image: ImageType;
  sizesQueries?: string;
};

type ImageWrapperProp = {
  hasImage: boolean;
};

const grid12 = grid({ s: 12, m: 12, l: 12, xl: 12 });

const ImageWrapper = styled.div.attrs<ImageWrapperProp>(props => {
  if (props.hasImage) {
    return {
      className: grid({ s: 2, m: 2, l: 2, xl: 2 }),
    };
  }
  return {
    className: grid12,
  };
})<ImageWrapperProp>``;

const TextWrapper = styled.div.attrs<HasImageProps>(props => {
  if (props.hasImage) {
    return {
      className: grid({ s: 10, m: 10, l: 10, xl: 10 }),
    };
  }
  return {
    className: grid12,
  };
})<HasImageProps>``;

const TitleWrapper = styled.div.attrs({
  className: classNames({
    'card-link__title': true,
    [font('wb', 4)]: true,
  }),
})``;

export const MediaObject: FunctionComponent<Props> = ({
  title,
  text,
  image,
  sizesQueries,
}: Props): ReactElement<Props> => {
  const ImageComponent = image?.crops?.square && (
    <Image {...image.crops.square} sizesQueries={sizesQueries} />
  );

  const description = text && <PrismicHtmlBlock html={text} />;
  return (
    <MediaObjectBase
      url={null}
      title={title}
      Image={ImageComponent}
      partNumber={undefined}
      partDescription={'Part'}
      color={undefined}
      StatusIndicator={null}
      description={description}
      urlOverride={null}
      DateInfo={null}
      ExtraInfo={null}
      primaryLabels={[]}
      secondaryLabels={[]}
      xOfY={undefined}
      OverrideImageWrapper={ImageWrapper}
      OverrideTextWrapper={TextWrapper}
      OverrideTitleWrapper={TitleWrapper}
    />
  );
};

export default MediaObject;
