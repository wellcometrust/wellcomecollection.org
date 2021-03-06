// @flow
import { font } from '../../../utils/classnames';
// $FlowFixMe (tsx)
import Icon from '../Icon/Icon';
// $FlowFixMe (tsx)
import Space from '../styled/Space';
import styled from 'styled-components';

const Wrapper = styled(Space).attrs({
  v: {
    size: 'm',
    properties: ['margin-top'],
  },
})`
  display: flex;
  flex-wrap: wrap;

  ${props => props.theme.media.xlarge`
    justify-content: space-between;
    flex-wrap: nowrap;
  `}
`;

const Cell = styled.div`
  flex-basis: 100%;
  min-width: 100%;

  ${props => props.theme.media.medium`
    flex-basis: 50%;
    min-width: 50%;
  `}

  ${props => props.theme.media.large`
    flex-basis: 25%;
    min-width: 25%;
  `}

  ${props => props.theme.media.xlarge`
    flex-basis: auto;
    min-width: 0;
  `}
`;

const Link = styled(Space).attrs({
  v: {
    size: 'l',
    properties: ['margin-bottom'],
  },
  as: 'a',
  className: font('hnb', 6),
})`
  color: ${props => props.theme.color('white')};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 200ms ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.color('green')};
  }

  .icon__shape {
    fill: ${props => props.theme.color('green')};
  }
`;

const items = [
  {
    url: 'https://twitter.com/explorewellcome',
    title: 'Twitter',
    service: 'Twitter',
    icon: 'twitter',
  },
  {
    url: 'https://www.facebook.com/wellcomecollection/',
    title: 'Facebook',
    service: 'Facebook',
    icon: 'facebook',
  },
  {
    url: 'https://www.instagram.com/wellcomecollection/',
    title: 'Instagram',
    service: 'Instagram',
    icon: 'instagram',
  },
  {
    url: 'https://soundcloud.com/wellcomecollection',
    title: 'Soundcloud',
    service: 'Soundcloud',
    icon: 'soundcloud',
  },
  {
    url: 'https://www.youtube.com/user/WellcomeCollection',
    title: 'YouTube',
    service: 'YouTube',
    icon: 'youtube',
  },
  {
    url:
      'https://www.tripadvisor.co.uk/Attraction_Review-g186338-d662065-Reviews-Wellcome_Collection-London_England.html',
    title: 'TripAdvisor',
    service: 'TripAdvisor',
    icon: 'tripadvisor',
  },
];

const FooterSocial = () => (
  <Wrapper>
    {items.map(item => (
      <Cell key={item.title}>
        <Link href={item.url}>
          <Space as="span" h={{ size: 's', properties: ['margin-right'] }}>
            <Icon name={item.icon} />
          </Space>
          <span>{item.title}</span>
          <span className="visually-hidden">{item.service}</span>
        </Link>
      </Cell>
    ))}
  </Wrapper>
);

export default FooterSocial;
