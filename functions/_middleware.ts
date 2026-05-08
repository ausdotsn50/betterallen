import metadata from './metadata.json';

interface PageMeta {
  title: string;
  description: string;
}

interface MetadataMap {
  [path: string]: PageMeta;
}

const metaMap = metadata as MetadataMap;

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export const onRequest = async ({
  request,
  next,
}: {
  request: Request;
  next: () => Promise<Response>;
}) => {
  const response = await next();
  const url = new URL(request.url);

  // Only transform HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // Normalize path: strip trailing slash, keep root as /
  const path = url.pathname.replace(/\/$/, '') || '/';

  // Find metadata — fallback to root if no match
  const meta = metaMap[path] || metaMap['/'];
  if (!meta) return response;

  const websiteUrl = `${url.protocol}//${url.host}`;
  const fullUrl = url.href;
  const ogImage = `${websiteUrl}/betterallen_navbar_white_text.webp`;

  return new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(meta.title);
      },
    })
    .on('head', {
      element(el) {
        el.append(
          `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
          { html: true }
        );
        el.append(`<meta property="og:image:width" content="1200" />`, {
          html: true,
        });
        el.append(`<meta property="og:image:height" content="630" />`, {
          html: true,
        });
        el.append(
          `<meta property="og:url" content="${escapeAttr(fullUrl)}" />`,
          { html: true }
        );
        el.append(`<meta property="og:type" content="website" />`, {
          html: true,
        });
        el.append(
          `<meta property="og:site_name" content="${escapeAttr(meta.title.split('|')[1]?.trim() || '')}" />`,
          { html: true }
        );
        el.append(
          `<meta name="description" content="${escapeAttr(meta.description)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:card" content="summary_large_image" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
          { html: true }
        );
      },
    })
    .transform(response);
};
