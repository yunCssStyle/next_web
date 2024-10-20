type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src.includes('ipfs')) {
    const url = src.replace('ipfs://', 'https://ipfs.io/ipfs/');
    return `${url}?w=${width}&q=${quality || 75}`;
  }

  if (src.includes('https://') || src.includes('http://')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  return `${process.env.NEXT_PUBLIC_CONTENT_DOMAIN}${src}?w=${width}&q=${
    quality || 75
  }`;
};

export default imageLoader;
