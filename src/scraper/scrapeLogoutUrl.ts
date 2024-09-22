import type { Root } from 'cheerio';

import { currentAmazonRegion } from '~/amazonRegion';

import { loadRemoteDom } from './loadRemoteDom';

export const parseSignoutLink = ($: Root): string => {
  const signoutLinkEl = $('#settings-link-logout').attr('href');

  if (signoutLinkEl) {
    return signoutLinkEl;
  }

  throw new Error('Could not parse logout link');
};

export const isLoggedIn = async (): Promise<boolean> => {
  const region = currentAmazonRegion();
  const kindleReaderUrl = region.kindleReaderUrl;

  const { didNavigateUrl } = await loadRemoteDom(kindleReaderUrl);
  return !didNavigateUrl.contains('signin');
}

export const scrapeLogoutUrl = async (): Promise<string> => {
  const region = currentAmazonRegion();
  const kindleReaderUrl = region.kindleReaderUrl;

  const { dom } = await loadRemoteDom(kindleReaderUrl);

    const signoutHrefUrl = parseSignoutLink(dom);
    return `${kindleReaderUrl}${signoutHrefUrl}`
};
