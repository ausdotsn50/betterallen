import metadata from './metadata.js';

export async function onRequest({ request, next }) {
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
  const meta = metadata[path] || metadata['/'];
  if (!meta) return response;

  const websiteUrl = `${url.protocol}//${url.host}`;
  const ogImage = `${websiteUrl}/betterallen_navbar_white_text.webp`;

  return new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(meta.title);
      },
    })
    .on('head', {
      element(el) {
        el.append(`<meta property="og:title" content="${esc(meta.title)}" />`, {
          html: true,
        });
        el.append(
          `<meta property="og:description" content="${esc(meta.description)}" />`,
          { html: true }
        );
        el.append(`<meta property="og:image" content="${esc(ogImage)}" />`, {
          html: true,
        });
        el.append(`<meta property="og:image:width" content="1200" />`, {
          html: true,
        });
        el.append(`<meta property="og:image:height" content="630" />`, {
          html: true,
        });
        el.append(`<meta property="og:url" content="${esc(url.href)}" />`, {
          html: true,
        });
        el.append(`<meta property="og:type" content="website" />`, {
          html: true,
        });
        el.append(
          `<meta name="description" content="${esc(meta.description)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:card" content="summary_large_image" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:title" content="${esc(meta.title)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:description" content="${esc(meta.description)}" />`,
          { html: true }
        );
        el.append(`<meta name="twitter:image" content="${esc(ogImage)}" />`, {
          html: true,
        });
      },
    })
    .transform(response);
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
