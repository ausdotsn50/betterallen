import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE_NAME = process.env.VITE_GOVERNMENT_NAME || 'Municipality of Allen';
const OG_IMAGE = '/betterallen_navbar_white_text.webp';

function readYaml(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return yaml.load(raw);
  } catch {
    return null;
  }
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function extractTitleAndDescription(markdown) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : undefined;
  const descMatch = markdown.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
  const description = descMatch
    ? descMatch[1].replace(/^>\s*/, '').trim()
    : undefined;
  return { title, description };
}

const manifest = {};

// ── Static routes ──
const staticRoutes = {
  '/': {
    title: `Home | ${SITE_NAME}`,
    description: `Official website of ${SITE_NAME}. Discover tourism attractions, government services, and local information for residents and visitors.`,
  },
  '/services': {
    title: `Services | ${SITE_NAME}`,
    description: `Explore all public services offered by ${SITE_NAME}. Find what you need for health, business, education, and more.`,
  },
  '/tourism': {
    title: `Tourism | ${SITE_NAME}`,
    description: `Discover the best tourist spots, accommodations, and attractions in ${SITE_NAME}.`,
  },
  '/government': {
    title: `Government | ${SITE_NAME}`,
    description: `Access information on elected leaders, municipal departments, and component barangays of ${SITE_NAME}.`,
  },
  '/contact': {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Contact information and emergency hotlines for ${SITE_NAME}.`,
  },
  '/about': {
    title: `About | ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME} and the BetterGov initiative.`,
  },
  '/about/allen': {
    title: `About Allen | ${SITE_NAME}`,
    description: `Learn about the history, geography, and economy of ${SITE_NAME}.`,
  },
  '/about/bettergov': {
    title: `About BetterGov | ${SITE_NAME}`,
    description: `Learn about the BetterGov initiative and how it helps local governments.`,
  },
  '/government/elected-officials': {
    title: `Elected Officials | ${SITE_NAME}`,
    description: `Meet the elected officials of ${SITE_NAME}, including the mayor, vice mayor, and councilors.`,
  },
  '/government/elected-officials/committees': {
    title: `Municipal Committees | ${SITE_NAME}`,
    description: `Active standing committees of the Sangguniang Bayan, including chairpersons and member assignments.`,
  },
  '/government/municipal-offices': {
    title: `Municipal Offices | ${SITE_NAME}`,
    description: `Directory of municipal offices and departments of ${SITE_NAME}.`,
  },
  '/government/barangays': {
    title: `Barangays | ${SITE_NAME}`,
    description: `Browse the component barangays of ${SITE_NAME}, including officials and contact information.`,
  },
};

Object.assign(manifest, staticRoutes);

// ── Service categories ──
const servicesFile = path.join(root, 'src/data/services.yaml');
const servicesData = readYaml(servicesFile);
if (servicesData?.categories) {
  for (const cat of servicesData.categories) {
    const catPath = `/services/${cat.slug}`;
    manifest[catPath] = {
      title: `${cat.category} | ${SITE_NAME}`,
      description:
        cat.description ||
        `Explore ${cat.category} services offered by ${SITE_NAME}.`,
    };

    // Service documents
    const indexFile = path.join(
      root,
      'content/services',
      cat.slug,
      'index.yaml'
    );
    const indexData = readYaml(indexFile);
    if (indexData?.pages) {
      for (const page of indexData.pages) {
        const pagePath = `${catPath}/${page.slug}`;
        // Try markdown for better description
        const mdFile = path.join(
          root,
          'content/services',
          cat.slug,
          `${page.slug}.md`
        );
        const mdContent = readText(mdFile);
        if (mdContent) {
          const { title, description } = extractTitleAndDescription(mdContent);
          manifest[pagePath] = {
            title: title || `${page.name} | ${SITE_NAME}`,
            description:
              description ||
              page.description ||
              `${page.name} — a service offered by ${SITE_NAME}.`,
          };
        } else {
          manifest[pagePath] = {
            title: `${page.name} | ${SITE_NAME}`,
            description:
              page.description ||
              `${page.name} — a service offered by ${SITE_NAME}.`,
          };
        }
      }
    }
  }
}

// ── Government document pages (markdown) ──
const govFile = path.join(root, 'src/data/government.yaml');
const govData = readYaml(govFile);
if (govData?.categories) {
  for (const cat of govData.categories) {
    const indexFile = path.join(
      root,
      'content/government',
      cat.slug,
      'index.yaml'
    );
    const indexData = readYaml(indexFile);
    if (indexData?.pages) {
      for (const page of indexData.pages) {
        const pagePath = `/government/${cat.slug}/${page.slug}`;
        const mdFile = path.join(
          root,
          'content/government',
          cat.slug,
          `${page.slug}.md`
        );
        const mdContent = readText(mdFile);
        if (mdContent) {
          const { title, description } = extractTitleAndDescription(mdContent);
          manifest[pagePath] = {
            title: title || `${page.name} | ${SITE_NAME}`,
            description:
              description ||
              page.description ||
              `${page.name} — ${cat.category} information from ${SITE_NAME}.`,
          };
        }
      }
    }
  }
}

// ── Tourism categories ──
const tourismFile = path.join(root, 'src/data/tourism.yaml');
const tourismData = readYaml(tourismFile);
if (tourismData?.categories) {
  for (const cat of tourismData.categories) {
    const catPath = `/tourism/${cat.slug}`;
    manifest[catPath] = {
      title: `${cat.category} | ${SITE_NAME}`,
      description:
        cat.description || `Explore ${cat.category} in ${SITE_NAME}.`,
    };

    // Tourism places
    const indexFile = path.join(
      root,
      'content/tourism',
      cat.slug,
      'index.yaml'
    );
    const indexData = readYaml(indexFile);
    if (indexData?.places) {
      for (const place of indexData.places) {
        // Places don't have individual pages yet, but we include them in
        // the category page metadata. Individual place routes can be added
        // here when they get their own pages.
      }
    }
  }
}

// ── Write manifest ──
const outDir = path.join(root, 'functions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'metadata.json');
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`✓ OG manifest generated at ${outFile}`);
console.log(`  ${Object.keys(manifest).length} routes registered`);
