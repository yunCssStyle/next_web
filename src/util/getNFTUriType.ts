export const getNFTUriType = async (uri: string) => {
  let imgUrl = uri;
  if (uri.includes('ipfs://')) {
    imgUrl = uri.replace(new RegExp('ipfs://'), 'https://ipfs.io/ipfs/');
  }

  return await fetch(imgUrl)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.blob();
    })
    .then((blob) => {
      const type = blob.type.split('/');
      return { uri: imgUrl, type: type[0] } as {
        uri: string;
        type: 'image' | 'video';
      };
    });
};
