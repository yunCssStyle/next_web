export const thousandsSeparator = (
  num: number,
  digits = 6,
  removeZero?: boolean
) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: removeZero ? 0 : digits,
    maximumFractionDigits: digits
  });
};

export const walletAddressShortener = (
  address: string,
  front?: number,
  back?: number
) => {
  return address.slice(0, front || 4) + '.....' + address.slice(-(back || 4));
};

export const cdnUrl = (path?: string) => {
  const cdnUrl = process.env.NEXT_PUBLIC_CONTENT_DOMAIN
    ? process.env.NEXT_PUBLIC_CONTENT_DOMAIN
    : '';

  if (cdnUrl.split('://')[1].includes('localhost')) {
    return path ?? '';
  }
  return `${cdnUrl}${path ?? ''}`;
};

export const videoUrlConverter = (url: string) => {
  url.replace('ipfs://', 'https://ipfs.io/ipfs/');

  switch (url) {
    case 'https://ipfs.io/ipfs/bafybeictugevjw2sio4ngfey77cxmpau5hzeww6gq2n3exx5io77r7f4zm':
      return cdnUrl('/assets/video/NFT_planet.mp4');
    case 'https://ipfs.io/ipfs/bafybeieerh7iwrd4rr2qaew6tp5xztyxeod4bhji4pghqst3unn5iewdpy':
      return cdnUrl('/assets/video/NFT_mini_planet.mp4');
    default:
      return url;
  }
};

export const emailAsterisk = (email: string) => {
  const [id, domain] = email.split('@');
  let asterisk = '';
  for (let i = 0; i < id.length - 4; i++) {
    asterisk += '*';
  }
  return id.slice(0, 3) + asterisk + id.at(-1) + '@' + domain;
};

export const converter = {
  thousandsSeparator,
  walletAddressShortener,
  cdnUrl,
  videoUrlConverter,
  emailAsterisk
};
