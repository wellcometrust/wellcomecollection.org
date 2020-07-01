import SectionHeader from '../SectionHeader/SectionHeader';
import Layout12 from '../Layout12/Layout12';
import SpacingSection from '../SpacingSection/SpacingSection';
import Space from '../styled/Space';
import GridFactory from '../GridFactory/GridFactory';
import WobblyEdge from '../WobblyEdge/WobblyEdge';
import Card from '../Card/Card';
import FeaturedCard from '../FeaturedCard/FeaturedCard';
import { classNames } from '../../../utils/classnames';

const ExampleFeaturedCard = ({ backgroundColor, color, isReversed }) => (
  <FeaturedCard
    image={{
      contentUrl: 'https://placehold.it/800x450',
      alt: '',
      width: 1600,
      height: 900,
      crops: {
        '16:9': {
          contentUrl: 'https://placehold.it/800x450',
          alt: '',
          width: 1600,
          height: 900,
        },
      },
    }}
    labels={[]}
    link={{ url: '#', text: 'accessibility' }}
    background={backgroundColor}
    color={color}
    isReversed={isReversed}
  >
    <h2 className="font-wb font-size-2">Accessibility</h2>
    <p className="font-hnl font-size-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
      similique ducimus inventore quia eveniet nisi debitis eos laudantium
      itaque necessitatibus cupiditate distinctio quam libero asperiores? Non
      incidunt vero vel laudantium.
    </p>
  </FeaturedCard>
);

const ExampleCard = () => (
  <Card
    item={{
      format: {
        id: 'example',
        title: 'Example',
      },
      title: 'This is a card',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, similique ducimus inventore quia eveniet nisi debitis eos laudantium itaque necessitatibus cupiditate distinctio quam libero asperiores? Non incidunt vero vel laudantium.',
      image: {
        contentUrl: 'https://placehold.it/800x450',
        alt: '',
        width: 1600,
        height: 900,
        crops: {
          '16:9': {
            contentUrl: 'https://placehold.it/800x450',
            alt: '',
            width: 1600,
            height: 900,
          },
        },
      },
      link: 'https://wellcomecollection.org',
    }}
  />
);

const VisitUsBody = () => {
  const sections = [
    {
      id: 0,
      featuredItem: (backgroundColor, color, isReversed) => (
        <ExampleFeaturedCard
          backgroundColor={backgroundColor}
          color={color}
          isReversed={isReversed}
        />
      ),
      items: [],
    },
    {
      id: 1,
      title: 'Things to do and see',
      featuredItem: (backgroundColor, color, isReversed) => (
        <ExampleFeaturedCard
          backgroundColor={backgroundColor}
          color={color}
          isReversed={isReversed}
        />
      ),
      items: [<ExampleCard />, <ExampleCard />, <ExampleCard />],
    },
    {
      id: 2,
      title: 'Planning a visit',
      items: [
        <ExampleCard />,
        <ExampleCard />,
        <ExampleCard />,
        <ExampleCard />,
        <ExampleCard />,
      ],
    },
    {
      id: 3,
      title: 'Eating and drinking',
      featuredItem: (backgroundColor, color, isReversed) => (
        <ExampleFeaturedCard
          backgroundColor={backgroundColor}
          color={color}
          isRversed={isReversed}
        />
      ),
      items: [<ExampleCard />, <ExampleCard />, <ExampleCard />],
    },
    {
      id: 4,
      items: [<ExampleCard />, <ExampleCard />],
    },
  ];

  const sectionThemes = [
    {
      rowBackground: 'white',
      cardBackground: 'cream',
      featuredCardBackground: 'charcoal',
      featuredCardText: 'white',
    },
    {
      rowBackground: 'cream',
      cardBackground: 'white',
      featuredCardBackground: 'white',
      featuredCardText: 'black',
    },
    {
      rowBackground: 'white',
      cardBackground: 'cream',
      featuredCardBackground: 'cream',
      featuredCardText: 'black',
    },
    {
      rowBackground: 'charcoal',
      cardBackground: 'transparent',
      featuredCardBackground: 'white',
      featuredCardText: 'black',
    },
  ];

  // Rules for FeaturedCard colours and layout:
  // White when on a cream background
  // Charcoal when standalone
  // Cream when on a white background
  // Image on the right when standalone

  return (
    <>
      {sections.map((section, index) => {
        const sectionTheme = sectionThemes[index % sectionThemes.length];
        return (
          <SpacingSection key={section.id}>
            <WobblyEdge background={sectionTheme.rowBackground} isStatic />
            <Space
              v={{ size: 'xl', properties: ['padding-top', 'padding-bottom'] }}
              className={classNames({
                'row card-theme': true,
                [`bg-${sectionTheme.rowBackground}`]: true,
                [`card-theme--${sectionTheme.cardBackground}`]: true,
              })}
            >
              {section.title && (
                <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                  <SectionHeader title={section.title} />
                </Space>
              )}
              {section.featuredItem && (
                <Space v={{ size: 'l', properties: ['margin-bottom'] }}>
                  <Layout12>
                    {section.featuredItem(
                      section.items.length === 0
                        ? 'charcoal'
                        : sectionTheme.featuredCardBackground,
                      section.items.length === 0
                        ? 'white'
                        : sectionTheme.featuredCardText,
                      section.items.length === 0
                    )}
                  </Layout12>
                </Space>
              )}
              <GridFactory items={section.items} />
            </Space>
            <WobblyEdge background={'white'} isStatic />
          </SpacingSection>
        );
      })}
    </>
  );
};

export default VisitUsBody;