"use server";

const normalizeUrl = (url: string) => {
  if (!url) return null;

  let urlString = url.trim();

  urlString = urlString.replace(/^https?:\/\//i, "");

  urlString = urlString.replace(/^www\./i, "");

  urlString = `https://${urlString}`;

  try {
    const parsedUrl = new URL(urlString);

    const domainZoneRegex = /\.[a-z0-9-]{2,}$/i;

    if (!domainZoneRegex.test(parsedUrl.hostname)) {
      return null;
    }

    return parsedUrl.href;
  } catch {
    return null;
  }
};
export default normalizeUrl;
