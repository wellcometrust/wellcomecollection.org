import Prismic from 'prismic-javascript';
import {OrderedMap} from 'immutable';
import {prismicApi} from '../services/prismic-api';
import {createPageConfig} from '../model/page-config';
import {getEventbriteEventEmbed} from '../services/eventbrite';
import {PromoFactory} from '../model/promo';
import {getArticleStubs} from '../services/wordpress';
import {getCuratedList} from '../services/prismic-curated-lists';
import {isFlagEnabled} from '../util/flag-status';
import {collectorsPromo} from '../data/series';
import {
  getArticle,
  getArticleList,
  getArticlePreview,
  getEvent,
  getWebcomic
} from '../services/prismic-content';

export const renderArticle = async(ctx, next) => {
  const format = ctx.request.query.format;
  // We rehydrate the `W` here as we take it off when we have the route.
  const id = `W${ctx.params.id}`;
  const article = await getArticle(id);

  render(ctx, article, format);
};

export async function renderArticlePreview(ctx, next) {
  const format = ctx.request.query.format;
  const id = `${ctx.params.id}`;
  const article = await getArticlePreview(id, ctx.request);
  render(ctx, article, format);
}

function render(ctx, article, format) {
  if (article) {
    if (format === 'json') {
      ctx.body = article;
    } else {
      ctx.render('pages/article', {
        pageConfig: createPageConfig({
          title: article.title,
          inSection: 'explore'
        }),
        article: article
      });
    }
  }
}

export async function setPreviewSession(ctx, next) {
  const {token} = ctx.request.query;
  ctx.cookies.set(Prismic.previewCookie, token, {
    maxAge: 60 * 30 * 1000,
    path: '/',
    httpOnly: false
  });

  const redirectUrl = await getPreviewSession(token);
  ctx.response.redirect(redirectUrl);
}

async function getPreviewSession(token) {
  const prismic = await prismicApi();

  return new Promise((resolve, reject) => {
    prismic.previewSession(token, (doc) => {
      switch (doc.type) {
        case 'article': return `/preview/${doc.id}`;
      }
    }, '/', (err, redirectUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(redirectUrl);
      }
    });
  });
}

export async function renderEvent(ctx, next) {
  const id = `${ctx.params.id}`;
  const event = await getEvent(id);
  const format = ctx.request.query.format;

  if (event) {
    if (format === 'json') {
      ctx.body = event;
    } else {
      ctx.render('pages/event', {
        pageConfig: createPageConfig({
          title: event.title,
          inSection: 'explore'
        }),
        article: event
      });
    }
  }
}

export const renderEventbriteEmbed = async(ctx, next) => {
  const {id} = ctx.params;
  const eventEmbedHtml = await getEventbriteEventEmbed(id);
  ctx.body = eventEmbedHtml;

  return next();
};

export async function renderWebcomic(ctx, next) {
  const id = `${ctx.params.id}`;
  const webcomic = await getWebcomic(id);
  const format = ctx.request.query.format;

  if (webcomic) {
    if (format === 'json') {
      ctx.body = webcomic;
    } else {
      ctx.render('pages/article', {
        pageConfig: createPageConfig({
          title: webcomic.title,
          inSection: 'explore'
        }),
        article: webcomic
      });
    }
  }
}

export async function renderExplore(ctx, next) {
  // TODO: Remove WP content
  const [flags] = ctx.intervalCache.get('flags');
  const prismicArticlesOnExploreFlag = isFlagEnabled(ctx.featuresCohort, 'prismicArticlesOnExplore', flags);
  const contentListPromise = prismicArticlesOnExploreFlag ? getArticleList() : Promise.resolve([]);

  const listRequests = [getCuratedList('explore'), getArticleStubs(10), contentListPromise];
  const [curatedList, articleStubs, contentList] = await Promise.all(listRequests);

  const wpPromos = articleStubs.data.map(PromoFactory.fromArticleStub);
  const contentPromos = contentList.map(PromoFactory.fromArticleStub);
  const promos = wpPromos.concat(contentPromos).sort((a, b) => {
    return a.datePublished.getTime() - b.datePublished.getTime();
  }).reverse();

  const dedupedPromos = promos.reduce((promoMap, promo) => {
    if (promo.url.match(/articles\/W|webcomics\//) || !promoMap.has(promo.title)) {
      return promoMap.set(promo.title, promo);
    } else {
      return promoMap;
    }
  }, OrderedMap()).toList().map((promo, index) => {
    if (index === 0) { // First promo on Explore page is treated differently
      return Object.assign({}, promo, {weight: 'lead'});
    } else {
      return promo;
    }
  });

  // TODO: Remove this, make it automatic
  const latestTweets = ctx.intervalCache.get('tweets');

  ctx.render('pages/curated-lists', {
    pageConfig: createPageConfig({
      title: 'Explore',
      inSection: 'explore',
      category: 'list'
    }),
    promos: dedupedPromos,
    curatedList,
    collectorsPromo, // TODO: Remove this, make it automatic
    latestTweets
  });

  return next();
}
