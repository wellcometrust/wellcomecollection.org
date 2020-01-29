// @flow
import Router from 'next/router';
import NextLink from 'next/link';
import { trackEvent } from '@weco/common/utils/ga';
import {
  type Work,
  type CatalogueApiError,
  type CatalogueApiRedirect,
} from '@weco/common/model/catalogue';
import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { grid, classNames } from '@weco/common/utils/classnames';
import {
  getIIIFPresentationLocation,
  getLocationOfType,
  type DigitalLocation,
  getAudio,
  getVideo,
} from '@weco/common/utils/works';
import { itemUrl } from '@weco/common/services/catalogue/urls';
import { clientSideSearchParams } from '@weco/common/services/catalogue/search-params';
import { iiifImageTemplate } from '@weco/common/utils/convert-image-uri';
import CataloguePageLayout from '@weco/common/views/components/CataloguePageLayout/CataloguePageLayout';
import { workLd } from '@weco/common/utils/json-ld';
import ErrorPage from '@weco/common/views/components/ErrorPage/ErrorPage';
import BackToResults from '@weco/common/views/components/BackToResults/BackToResults';
import WorkHeader from '@weco/common/views/components/WorkHeader/WorkHeader';
import WorkDetails from '../components/WorkDetails/WorkDetails';
import SearchForm from '../components/SearchForm/SearchForm';
import ManifestContext from '@weco/common/views/components/ManifestContext/ManifestContext';
import { getWork } from '../services/catalogue/works';
import IIIFPresentationPreview from '@weco/common/views/components/IIIFPresentationPreview/IIIFPresentationPreview';
import IIIFImagePreview from '@weco/common/views/components/IIIFImagePreview/IIIFImagePreview';
import WorkPreview from '@weco/common/views/components/WorkPreview/WorkPreview';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import WobblyRow from '@weco/common/views/components/WobblyRow/WobblyRow';
import Space from '@weco/common/views/components/styled/Space';
import VideoPlayer from '@weco/common/views/components/VideoPlayer/VideoPlayer';
import AudioPlayer from '@weco/common/views/components/AudioPlayer/AudioPlayer';

import TogglesContext from '@weco/common/views/components/TogglesContext/TogglesContext';

type Props = {|
  work: Work | CatalogueApiError,
|};

const getFirstChildManifest = async function(manifests) {
  const firstManifestUrl = manifests.find(manifest => manifest['@id'])['@id'];
  const data = await (await fetch(firstManifestUrl)).json();
  return data;
};

export const WorkPage = ({ work }: Props) => {
  const [iiifPresentationManifest, setIIIFPresentationManifest] = useState(
    null
  );
  const [childManifestsCount, setChildManifestsCount] = useState(0);
  const [firstChildManifest, setFirstChildManifest] = useState(null);
  const fetchIIIFPresentationManifest = async () => {
    try {
      const iiifPresentationLocation = getIIIFPresentationLocation(work);
      const iiifManifest = await fetch(iiifPresentationLocation.url);
      const manifestData = await iiifManifest.json();

      if (manifestData.manifests) {
        setChildManifestsCount(manifestData.manifests.length);
        setFirstChildManifest(
          await getFirstChildManifest(manifestData.manifests)
        );
      }
      setIIIFPresentationManifest(manifestData);
    } catch (e) {}
  };
  const workData = {
    workType: (work.workType ? work.workType.label : '').toLocaleLowerCase(),
  };

  const searchParams = clientSideSearchParams();

  const video = iiifPresentationManifest && getVideo(iiifPresentationManifest);
  const audio = iiifPresentationManifest && getAudio(iiifPresentationManifest);

  useEffect(() => {
    window.dataLayer &&
      window.dataLayer.push({
        event: 'pageview',
        work: JSON.stringify(workData),
      });
    fetchIIIFPresentationManifest();
  }, []);

  if (work.type === 'Error') {
    return (
      <ErrorPage
        title={
          work.httpStatus === 410
            ? 'This catalogue item has been removed.'
            : null
        }
        statusCode={work.httpStatus}
      />
    );
  }

  const iiifPresentationLocation = getIIIFPresentationLocation(work);

  const sierraIdFromPresentationManifestUrl =
    iiifPresentationLocation &&
    (iiifPresentationLocation.url.match(/iiif\/(.*)\/manifest/) || [])[1];

  const iiifImageLocation = getLocationOfType(work, 'iiif-image');

  const digitalLocation: ?DigitalLocation =
    iiifImageLocation && iiifImageLocation.type === 'DigitalLocation'
      ? iiifImageLocation
      : null;

  const iiifImageLocationUrl = digitalLocation && digitalLocation.url;

  const imageContentUrl =
    digitalLocation && digitalLocation.url
      ? iiifImageTemplate(digitalLocation.url)({ size: `800,` })
      : null;

  const itemUrlObject = itemUrl({
    ...searchParams,
    workId: work.id,
    sierraId:
      (firstChildManifest &&
        firstChildManifest['@id'].match(
          /^https:\/\/wellcomelibrary\.org\/iiif\/(.*)\/manifest$/
        )[1]) ||
      sierraIdFromPresentationManifestUrl ||
      null,
    langCode: work.language && work.language.id,
    canvas: 1,
    page: 1,
  });

  return (
    <CataloguePageLayout
      title={work.title}
      description={work.description || work.title}
      url={{ pathname: `/works/${work.id}` }}
      openGraphType={'website'}
      jsonLd={workLd(work)}
      siteSection={'works'}
      oEmbedUrl={`https://wellcomecollection.org/oembed/works/${work.id}`}
      imageUrl={imageContentUrl}
      imageAltText={work.title}
      hideNewsletterPromo={true}
    >
      <div className="container">
        <div className="grid">
          <div
            className={classNames({
              [grid({ s: 12, m: 10, l: 8, xl: 8 })]: true,
            })}
          >
            <SearchForm
              ariaDescribedBy="search-form-description"
              compact={true}
              shouldShowFilters={false}
              searchParams={searchParams}
              workTypeAggregations={null}
            />
          </div>
        </div>
        <div className="grid">
          <Space
            v={{
              size: 's',
              properties: ['padding-top', 'padding-bottom'],
            }}
            className={classNames({
              [grid({ s: 12 })]: true,
            })}
          >
            <BackToResults />
          </Space>
        </div>
      </div>
      <Space
        v={{
          size: 'xl',
          properties: ['padding-top'],
        }}
        className={classNames({
          row: true,
        })}
      >
        <div className="container">
          <div className="grid">
            <WorkHeader work={work} childManifestsCount={childManifestsCount} />
          </div>
        </div>
      </Space>
      <NextLink {...itemUrlObject}>
        <a
          className="plain-link"
          onClick={() => {
            trackEvent({
              category: 'WorkPreview',
              action: 'follow link',
              label: itemUrlObject.href.query.workId,
            });
          }}
        >
          test link
        </a>
      </NextLink>

      {/* TODO take audio and video players out of IIIFPresentationPreview and put here - how deal with no js link? */}
      {video && (
        <WobblyRow>
          <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
            <VideoPlayer video={video} />
          </Space>
        </WobblyRow>
      )}

      {audio && (
        <WobblyRow>
          <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
            <AudioPlayer audio={audio} />
          </Space>
        </WobblyRow>
      )}

      <TogglesContext.Consumer>
        {({ simplifiedPreview }) =>
          simplifiedPreview &&
          work.thumbnail && <WorkPreview imagePath={work.thumbnail.url} />
        }
      </TogglesContext.Consumer>
      {firstChildManifest && (
        <ManifestContext.Provider value={firstChildManifest}>
          <SpacingComponent>
            <IIIFPresentationPreview
              childManifestsCount={childManifestsCount}
              itemUrl={itemUrl({
                ...searchParams,
                workId: work.id,
                sierraId:
                  firstChildManifest['@id'].match(
                    /^https:\/\/wellcomelibrary\.org\/iiif\/(.*)\/manifest$/
                  )[1] || sierraIdFromPresentationManifestUrl,
                langCode: work.language && work.language.id,
                canvas: 1,
                page: 1,
              })}
            />
          </SpacingComponent>
        </ManifestContext.Provider>
      )}
      <ManifestContext.Provider value={iiifPresentationManifest}>
        {!firstChildManifest &&
          sierraIdFromPresentationManifestUrl &&
          !iiifImageLocationUrl && (
            <IIIFPresentationPreview
              itemUrl={itemUrl({
                ...searchParams,
                workId: work.id,
                sierraId: sierraIdFromPresentationManifestUrl,
                langCode: work.language && work.language.id,
                canvas: 1,
                page: 1,
              })}
            />
          )}
      </ManifestContext.Provider>
      {iiifImageLocationUrl && (
        <WobblyRow>
          <IIIFImagePreview
            iiifUrl={iiifImageLocationUrl}
            itemUrl={itemUrl({
              ...searchParams,
              workId: work.id,
              sierraId: null,
              langCode: work.language && work.language.id,
              canvas: 1,
              page: 1,
            })}
          />
        </WobblyRow>
      )}

      <WorkDetails
        work={work}
        iiifPresentationManifest={iiifPresentationManifest}
        childManifestsCount={childManifestsCount}
      />
    </CataloguePageLayout>
  );
};

WorkPage.getInitialProps = async (
  ctx
): Promise<Props | CatalogueApiRedirect> => {
  const { id } = ctx.query;

  const workOrError = await getWork({
    id,
  });

  if (workOrError && workOrError.type === 'Redirect') {
    const { res } = ctx;
    if (res) {
      res.writeHead(workOrError.status, {
        Location: workOrError.redirectToId,
      });
      res.end();
    } else {
      Router.push(workOrError.redirectToId);
    }
    return workOrError;
  } else {
    return {
      work: workOrError,
    };
  }
};

export default WorkPage;
