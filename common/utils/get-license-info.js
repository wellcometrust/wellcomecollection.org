// @flow
export type LicenseData = {|
  text: string,
  humanReadableText: string[],
  icons?: string[],
  description?: string,
  url?: string,
|};

export const licenseMap = {
  pdm: {
    url: 'https://creativecommons.org/publicdomain/mark/1.0/',
    text: 'Public Domain',
    icons: ['ccPdm'],
    humanReadableText: [
      'You can use this work for any purpose without restriction under copyright law.',
      'Public Domain Mark (PDM) terms and conditions <a href="https://creativecommons.org/publicdomain/mark/1.0">https://creativecommons.org/publicdomain/mark/1.0</a>',
    ],
  },
  'cc-0': {
    url: 'https://creativecommons.org/publicdomain/zero/1.0/',
    text: 'CC0',
    icons: ['ccZero'],
    description: 'Free to use for any purpose',
    humanReadableText: [
      'You can use this work for any purpose without restriction under copyright law.',
      'Creative Commons Zero (CC0) terms and conditions <a href="https://creativecommons.org/publicdomain/zero/1.0">https://creativecommons.org/publicdomain/zero/1.0</a>',
    ],
  },
  'cc-by': {
    url: 'https://creativecommons.org/licenses/by/4.0/',
    text: 'CC BY',
    icons: ['cc', 'ccBy'],
    description: 'Free to use with attribution',
    humanReadableText: [
      'You can use this work for any purpose, including commercial uses, without restriction under copyright law. You should also provide attribution to the original work, source and licence.',
      'Creative Commons Attribution (CC BY 4.0) terms and conditions <a href="https://creativecommons.org/licenses/by/4.0">https://creativecommons.org/licenses/by/4.0</a>',
    ],
  },
  'cc-by-nc': {
    url: 'https://creativecommons.org/licenses/by-nc/4.0/',
    text: 'CC BY-NC',
    icons: ['cc', 'ccBy', 'ccNc'],
    description: 'Free to use with attribution for non-commercial purposes',
    humanReadableText: [
      'You can use this work for any purpose, as long as it is not primarily intended for or directed to commercial advantage or monetary compensation. You should also provide attribution to the original work, source and licence.',
      'Creative Commons Attribution Non-Commercial (CC BY-NC 4.0) terms and conditions <a href="https://creativecommons.org/licenses/by-nc/4.0">https://creativecommons.org/licenses/by-nc/4.0</a>',
    ],
  },
  'cc-by-nc-nd': {
    url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    text: 'CC BY-NC-ND',
    icons: ['cc', 'ccBy', 'ccNc', 'ccNd'],
    description:
      'Free to use with attribution for non-commercial purposes. No modifications permitted.',
    humanReadableText: [
      'You can copy and distribute this work, as long as it is not primarily intended for or directed to commercial advantage or monetary compensation. You should also provide attribution to the original work, source and licence.',
      'If you make any modifications to or derivatives of the work, it may not be distributed.',
      'Creative Commons Attribution Non-Commercial No-Derivatives (CC BY-NC-ND 4.0) terms and conditions <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">https://creativecommons.org/licenses/by-nc-nd/4.0/</a>',
    ],
  },
  'cc-by-nd': {
    url: 'https://creativecommons.org/licenses/by-nd/4.0/',
    text: 'CC BY-ND',
    icons: ['cc', 'cc_by', 'cc_nd'],
    description: 'Free to use with attribution. No modifications permitted.',
  },
  'cc-by-sa': {
    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    text: 'CC BY-SA',
    icons: ['cc', 'cc_by'],
  },
  'cc-by-nc-sa': {
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    text: 'CC BY-NC-SA',
    icons: ['cc', 'cc_by', 'cc_nc'],
  },
  ogl: {
    url:
      'http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
    text: 'Open Government License',
  },
  opl: {
    url: 'http://opencontent.org/openpub/',
    text: 'Open Publication License',
  },
  'in copyright': {
    url: 'http://rightsstatements.org/vocab/InC/1.0/',
    text: 'In copyright',
  },
};

export default function getLicenseInfo(
  licenseIdentifier: string
): ?LicenseData {
  return (
    licenseMap[licenseIdentifier.toLowerCase()] ||
    Object.keys(licenseMap)
      .map(licenseKey => {
        if (licenseMap[licenseKey].url === licenseIdentifier) {
          return licenseMap[licenseKey];
        }
      })
      .filter(Boolean)[0]
  );
}
