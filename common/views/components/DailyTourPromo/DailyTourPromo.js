// @flow
import EventPromo from '../EventPromo/EventPromo';

const image = {
  contentUrl:
    'https://images.prismic.io/wellcomecollection/7657f9e9-0733-444d-b1b2-6ae0bafa0ff9_c7c94c39161dcfe15d9abd8b40256ea2b40f52b9_c0139861.jpg?auto=compress,format',
  width: 2996,
  height: 2000,
  alt: '',
  tasl: {
    author: null,
    copyrightHolder: null,
    copyrightLink: null,
    license: null,
    sourceLink: null,
    sourceName: null,
    title: null,
  },
  crops: {},
};

export const data = {
  type: 'events',
  id: 'tours',
  title: 'Daily Guided Tours and Discussions',
  times: [],
  series: [],
  place: null,
  bookingEnquiryTeam: null,
  interpretations: [],
  audiences: [],
  policies: [],
  bookingInformation: null,
  cost: null,
  bookingType: null,
  thirdPartyBooking: null,
  isCompletelySoldOut: false,
  isPast: false,
  isRelaxedPerformance: false,
  format: {
    id: 'WmYRpCQAACUAn-Ap',
    title: 'Gallery tour',
    shortName: null,
    description: null,
  },
  body: [],
  contributors: [],
  contributorsTitle: null,
  dateRange: {
    firstDate: new Date(),
    lastDate: new Date(),
    repeats: 0,
  },
  image: image,
  hasEarlyRegistration: false,
  labels: [
    {
      text: 'Gallery tour',
    },
  ],
  primaryLabels: [],
  secondaryLabels: [],
  promo: {
    image: image,
    link: '/pages/Wuw19yIAAK1Z3Sma',
    caption: null,
  },
  promoImage: { ...image, minWidth: null },
  promoText: null,
  squareImage: null,
  widescreenImage: null,
  ticketSalesStart: null,
  displayEnd: new Date(),
  displayStart: new Date(),
  standfirst: null,
  metadataDescription: null,
  scheduleLength: 0,
  seasons: [],
  isOnline: false,
  availableOnline: false,
};

const DailyTourPromo = () => (
  <EventPromo
    event={data}
    dateString={'Tuesday–Sunday'}
    timeString={'11:45, 14:45 and 15:45'}
  />
);
export default DailyTourPromo;
