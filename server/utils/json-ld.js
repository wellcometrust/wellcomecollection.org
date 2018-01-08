import type {EventPromo, Event} from '../content-model/events';
import {wellcomeCollection, wellcomeCollectionAddress} from '../model/organization';
import {convertImageUri} from '../filters/convert-image-uri';

export function objToJsonLd<T>(obj: T, type: string, root: boolean = true) {
  const jsonObj = JSON.parse(JSON.stringify(obj));
  const jsonLdAddition = root ? {
    '@context': 'http://schema.org',
    '@type': type
  } : { '@type': type };
  return Object.assign({}, jsonObj, jsonLdAddition);
}

export function contentLd(content) {
  return objToJsonLd({
    headline: content.headline,
    author: (content.author && content.author.map(a => a.person).map(personLd)) || 'unknown',
    image: imageLd(content.thumbnail),
    datePublished: content.datePublished,
    dateModified: content.datePublished,
    publisher: orgLd(wellcomeCollection),
    mainEntityOfPage: `https://wellcomecollection.org${content.url}`
  }, 'Article');
}

export function exhibitionLd(content) {
  return objToJsonLd({
    name: content.title,
    description: content.safeDescription.val,
    image: content.featuredImage && convertImageUri(content.featuredImage.contentUrl, 1920, false),
    location: {
      '@type': 'Place',
      name: 'Wellcome Collection',
      address: objToJsonLd(wellcomeCollectionAddress, 'PostalAddress', false)
    },
    startDate: content.start,
    endDate: content.end,
    url: `https://wellcomecollection.org/exhibitions/${content.id}`,
    isAccessibleForFree: true
  }, 'ExhibitionEvent');
}

export function workLd(content) {
  const creators = content.creators.map(c => {
    return {
      '@type': 'Person',
      name: c.label
    };
  });

  const keywords = content.subjects.map(s => s.label)
    .join(',');

  return objToJsonLd({
    additionalType: null, // TODO: needs API
    locationCreated: null, // TODO: needs API
    genre: null, // TODO: needs API
    datePublished: null, // TODO: needs API
    dateCreated: null, // TODO: needs API
    dateModified: null, // TODO: needs API
    alternativeHeadline: null, // TODO: needs API
    publishedBy: null, // TODO: needs API
    creator: creators,
    keywords: keywords,
    name: content.title,
    description: content.description,
    image: content.imgLink,
    thumbnailUrl: content.thumbnail && content.thumbnail.url,
    license: content.thumbnail && content.thumbnail.license.url
  }, 'CreativeWork');
}

export function museumLd(museum) {
  const openingHoursSpecification = museum.openingHoursSpecification.map(ohs => {
    return {
      dayOfWeek: ohs.dayOfWeek,
      closes: ohs.closes,
      opens: ohs.opens
    };
  });
  const newMuseum = Object.assign({}, museum, {openingHoursSpecification, logo: imageLd(museum.logo)});
  delete newMuseum.twitterHandle;
  return objToJsonLd(newMuseum, 'Museum');
}

export function eventLd(event: Event) {
  return event.times.map(eventTime => {
    // I don't like it, but mutation seems the easiest way here >.<
    const eventWith1Time = Object.assign({}, event);
    eventWith1Time.times = [eventTime];
    return eventWith1Time;
  }).map(event => {
    return objToJsonLd({
      name: event.title,
      // TODO: This is not always at Wellcome, but we don't collect that yet
      location: {
        '@type': 'Place',
        name: 'Wellcome Collection',
        address: objToJsonLd(wellcomeCollectionAddress, 'PostalAddress', false)
      },
      startDate: event.times.map(range => range.startDateTime),
      endDate: event.times.map(range => range.endDateTime),
      description: event.description,
      image: event.promo && convertImageUri(event.promo.image.contentUrl, 1920, false)
    }, 'Event');
  });
}

export function eventPromoLd(eventPromo: EventPromo) {
  return objToJsonLd({
    name: eventPromo.title,
    location: {
      '@type': 'Place',
      name: 'Wellcome Collection',
      address: objToJsonLd(wellcomeCollectionAddress, 'PostalAddress', false)
    },
    startDate: eventPromo.start,
    endDate: eventPromo.end,
    description: eventPromo.description,
    image: eventPromo && convertImageUri(eventPromo.image.contentUrl, 1920, false)
  }, 'Event');
}

function orgLd(org) {
  return org && objToJsonLd({
    name: org.name,
    url: org.url,
    logo: imageLd(org.logo),
    sameAs: org.sameAs
  }, 'Organization');
}

function personLd(person) {
  return person && objToJsonLd({
    name: person.name,
    description: person.description,
    image: person.image
  }, 'Person');
}

function imageLd(image) {
  return image && objToJsonLd({
    url: image.contentUrl || image.url,
    width: image.width,
    height: image.height
  }, 'ImageObject');
}
