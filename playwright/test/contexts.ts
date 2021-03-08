import { baseUrl } from './helpers/urls';

const multiVolumeItem = async (): Promise<void> => {
  await page.goto(`${baseUrl}/works/mg56yqa4/items`);
};

const worksSearch = async (): Promise<void> => {
  // This is because the cookie notice actually hides interface.
  // It should also not live here, but I was battling on getting it to
  // run for the first test of a suite (even on beforeAll/beforeEach)
  context.addCookies([
    {
      name: 'WC_cookiesAccepted',
      value: 'true',
      path: '/',
      domain: new URL(baseUrl).host,
    },
  ]);

  await page.goto(`${baseUrl}/works`);
};

export const isMobile = Boolean(deviceName);

export { multiVolumeItem, worksSearch };
