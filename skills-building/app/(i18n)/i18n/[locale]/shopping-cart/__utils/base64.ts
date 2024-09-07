import { getPlaiceholder } from 'plaiceholder';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const getBase64 = async (url: string) => {
  const buffer = await fetch(
    `${siteUrl?.endsWith('/') ? siteUrl : siteUrl + '/'}${url}`,
  ).then(async (res) => Buffer.from(await res.arrayBuffer()));

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};
