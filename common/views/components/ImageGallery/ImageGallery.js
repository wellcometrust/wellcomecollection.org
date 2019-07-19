// @flow
// TODO: use styled components
import { Fragment, Component, createRef } from 'react';
import { font, spacing, classNames } from '../../../utils/classnames';
import { CaptionedImage } from '../Images/Images';
import WobblyEdge from '../WobblyEdge/WobblyEdge';
import Button from '../Buttons/Button/Button';
import Control from '../Buttons/Control/Control';
import Icon from '../Icon/Icon';
import Layout12 from '../Layout12/Layout12';
import type { CaptionedImage as CaptionedImageProps } from '../../../model/captioned-image';
import { PageBackgroundContext } from '../ContentPage/ContentPage';
import { repeatingLsBlack } from '../../../utils/backgrounds';
import { breakpoints } from '../../../utils/breakpoints';
import { trackEvent } from '../../../utils/ga';
import VerticalSpace from '../styled/VerticalSpace';

type Props = {|
  id: string,
  title: ?string,
  items: CaptionedImageProps[],
  isStandalone: boolean,
|};

type State = {|
  isActive: boolean,
  titleStyle: ?{| transform: string, maxWidth: string, opacity: number |},
|};

class ImageGallery extends Component<Props, State> {
  state = {
    isActive: true,
    titleStyle: null,
  };

  openButtonRef: {
    current: HTMLButtonElement | HTMLAnchorElement | null,
  } = createRef();

  closeButtonRef: {
    current: HTMLAnchorElement | HTMLButtonElement | null,
  } = createRef();

  handleOpenClicked() {
    if (this.closeButtonRef.current) {
      this.closeButtonRef.current.tabIndex = 0;
      this.closeButtonRef.current.focus();
      this.showAllImages(true);
    }

    if (this.openButtonRef.current) {
      this.openButtonRef.current.tabIndex = -1;
    }
  }

  handleCloseClicked() {
    if (this.openButtonRef.current) {
      this.openButtonRef.current.tabIndex = 0;
      this.setState({ isActive: false });

      trackEvent({
        category: `Control`,
        action: 'close ImageGallery',
        label: this.props.id,
      });
    }

    if (this.closeButtonRef.current) {
      this.closeButtonRef.current.tabIndex = -1;
    }
  }

  showAllImages = (isButton?: boolean) => {
    trackEvent({
      category: `${isButton ? 'Button' : 'CaptionedImage'}`,
      action: 'open ImageGallery',
      label: this.props.id,
    });
    this.setState({
      isActive: true,
    });
  };

  itemsToShow = () => {
    return this.state.isActive ? this.props.items : [this.props.items[0]];
  };

  componentDidMount() {
    !this.props.isStandalone &&
      this.setState({
        isActive: false,
      });
  }

  // We want the image gallery title to be aligned with the first image
  // So we adjust the translateX and width accordingly
  setTitleStyle = (value: number) => {
    this.setState({
      titleStyle: {
        transform: `translateX(calc((100vw - ${value}px) / 2))`,
        maxWidth: `${value}px`,
        opacity: 1,
      },
    });
  };

  render() {
    const { title, items, isStandalone, id } = this.props;
    const { isActive, titleStyle } = this.state;

    return (
      <PageBackgroundContext.Consumer>
        {theme => (
          <Fragment>
            {!isStandalone && (
              <VerticalSpace
                as="span"
                size="m"
                style={titleStyle}
                className={classNames({
                  'flex flex--v-top image-gallery-v2-title': true,
                })}
              >
                <Icon
                  name="gallery"
                  extraClasses={`${spacing({ s: 1 }, { margin: ['right'] })}`}
                />
                <h2 id={`gallery-${id}`} className="h2 no-margin">
                  {title || 'In pictures'}
                </h2>
              </VerticalSpace>
            )}
            <div
              id={`image-gallery-${id}`}
              className={classNames({
                'image-gallery-v2--standalone': isStandalone,
                'image-gallery-v2 row relative': true,
                'is-active font-white': isActive,
              })}
            >
              <div
                className={classNames({
                  'absolute image-gallery-v2__background': true,
                  'image-gallery-v2__background--standalone': isStandalone,
                })}
                style={{
                  bottom: 0,
                  width: `100%`,
                  background: `url(${repeatingLsBlack}) no-repeat top center`,
                }}
              />
              <Layout12>
                <VerticalSpace
                  size="xl"
                  properties={[isStandalone ? 'padding-top' : undefined]}
                  className={classNames({
                    relative: true,
                  })}
                >
                  {isStandalone && (
                    <div className="absolute image-gallery-v2__standalone-wobbly-edge">
                      <WobblyEdge
                        extraClasses="wobbly-edge--rotated"
                        background={'white'}
                      />
                    </div>
                  )}
                  {!isActive && (
                    <Fragment>
                      <div className="image-gallery-v2__wobbly-edge absolute">
                        <WobblyEdge background={theme} />
                      </div>
                    </Fragment>
                  )}

                  {!isStandalone && (
                    <VerticalSpace
                      size="m"
                      properties={['padding-top']}
                      className={classNames({
                        'image-gallery-v2__close-wrapper absolute': true,
                      })}
                    >
                      <VerticalSpace
                        size="m"
                        properties={['padding-bottom']}
                        className={classNames({
                          'flex flex-end': true,
                          'image-gallery-v2__close': true,
                          'opacity-0': !isActive,
                          [spacing({ s: 3 }, { padding: ['right'] })]: true,
                        })}
                      >
                        <Control
                          tabIndex={`-1`}
                          ariaControls={`image-gallery-${id}`}
                          ariaExpanded={isActive}
                          ref={this.closeButtonRef}
                          replace={true}
                          link={{
                            href: `#gallery-${id}`,
                            as: `#gallery-${id}`,
                          }}
                          type={`light`}
                          text={`close`}
                          icon={`cross`}
                          clickHandler={() => {
                            this.handleCloseClicked();
                          }}
                        />
                      </VerticalSpace>
                    </VerticalSpace>
                  )}
                  {this.itemsToShow().map((captionedImage, i) => (
                    <VerticalSpace
                      size="xl"
                      properties={[isActive ? 'margin-bottom' : undefined]}
                      onClick={() => {
                        if (!isActive) {
                          this.handleOpenClicked();
                        }
                      }}
                      key={captionedImage.image.contentUrl}
                      style={{
                        cursor: !isActive ? 'pointer' : 'default',
                      }}
                    >
                      <CaptionedImage
                        image={captionedImage.image}
                        caption={captionedImage.caption}
                        setTitleStyle={i === 0 ? this.setTitleStyle : undefined}
                        sizesQueries={`
                          (min-width: ${breakpoints.xlarge}) calc(${breakpoints.xlarge} - 120px),
                          calc(100vw - 84px)
                        `}
                        preCaptionNode={
                          items.length > 1 ? (
                            <VerticalSpace
                              size="m"
                              className={classNames({
                                [font({ s: 'HNM5', m: 'HNM4' })]: true,
                              })}
                            >
                              <span className="visually-hidden">slide </span>
                              {i + 1} of {items.length}
                            </VerticalSpace>
                          ) : null
                        }
                      />
                    </VerticalSpace>
                  ))}

                  {titleStyle && (
                    <Button
                      ref={this.openButtonRef}
                      ariaControls={`image-gallery-${id}`}
                      ariaExpanded={isActive}
                      type="primary"
                      icon="gallery"
                      clickHandler={() => {
                        this.handleOpenClicked();
                      }}
                      extraClasses={classNames({
                        'image-gallery-v2__button absolute': true,
                        'opacity-0': isActive,
                      })}
                      text={`${items.length} images`}
                    />
                  )}
                </VerticalSpace>
              </Layout12>
            </div>
          </Fragment>
        )}
      </PageBackgroundContext.Consumer>
    );
  }
}

export default ImageGallery;
