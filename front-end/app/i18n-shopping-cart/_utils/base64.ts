import { getPlaiceholder } from 'plaiceholder';

export const getBase64 = async (url: string) => {
  const buffer = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`,
  ).then(async (res) => Buffer.from(await res.arrayBuffer()));

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};
