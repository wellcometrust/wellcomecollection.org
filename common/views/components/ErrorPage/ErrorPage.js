// @flow
// $FlowFixMe (tsx)
import PageLayout from '../PageLayout/PageLayout';
import ContentPage from '../ContentPage/ContentPage';
import PageHeader from '../PageHeader/PageHeader';
import Body from '../Body/Body';
// $FlowFixMe (tsx)
import MoreLink from '../MoreLink/MoreLink';
import Space from '../styled/Space';
import { headerBackgroundLs } from '@weco/common/utils/backgrounds';
// $FlowFixMe (tsx)
import { type GlobalContextData } from '@weco/common/views/components/GlobalContextProvider/GlobalContextProvider';

type Props = {|
  statusCode: number,
  title?: ?string,
  globalContextData: GlobalContextData,
|};

const ErrorPage = ({ statusCode, title, globalContextData }: Props) => {
  return (
    <PageLayout
      title={`${statusCode}`}
      description={`${statusCode}`}
      url={{ pathname: `/` }}
      jsonLd={{ '@type': 'WebPage' }}
      openGraphType={'website'}
      siteSection={'stories'}
      imageUrl={null}
      imageAltText={null}
      globalContextData={globalContextData}
    >
      <ContentPage
        id={'error'}
        Header={
          <PageHeader
            breadcrumbs={{ items: [] }}
            labels={null}
            title={
              title ||
              'This isn’t the page you’re looking for, but how about these?'
            }
            ContentTypeInfo={null}
            Background={null}
            backgroundTexture={headerBackgroundLs}
            FeaturedMedia={null}
            HeroPicture={null}
            highlightHeading={true}
          />
        }
        Body={<Body body={[]} pageId={'error'} />}
      >
        <div className="body-text">
          <Space as="ul" v={{ size: 'xl', properties: ['margin-bottom'] }}>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }} as="li">
              <MoreLink url="/whats-on" name="Our exhibitions and events" />
            </Space>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }} as="li">
              <MoreLink url="https://wellcomelibrary.org" name="Our library" />
            </Space>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }} as="li">
              <MoreLink url="/stories" name="Our stories" />
            </Space>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }} as="li">
              <MoreLink url="/books" name="Our books" />
            </Space>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }} as="li">
              <MoreLink url="/works" name="Our images" />
            </Space>
            <li size="l" as="li">
              <MoreLink
                url="/pages/Wuw2MSIAACtd3Ssg"
                name="Our youth programme"
              />
            </li>
          </Space>

          <div>
            <h2 className="h2">Looking for something published before 2018?</h2>
            <p>
              Our websites have been archived by the{' '}
              <a href="https://archive.org">Internet Archive</a> in its{' '}
              <a href="https://web.archive.org/">Wayback Machine</a>.
            </p>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
              <MoreLink
                url="https://web.archive.org/web/*/wellcomecollection.org"
                name="See the Wellcome Collection website from 2007-present"
              />
            </Space>
            <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
              <MoreLink
                url="https://web.archive.org/web/*/blog.wellcomecollection.org"
                name="Read blog posts from 2013-2017"
              />
            </Space>
          </div>

          <div>
            <p>
              If you{`'`}re looking for something specific you{`'`}d love to see
              return to this website, email us at{' '}
              <a href="mailto:digital@wellcomecollection.org">
                digital@wellcomecollection.org
              </a>
              .
            </p>
          </div>
        </div>
      </ContentPage>
    </PageLayout>
  );
};

export default ErrorPage;
