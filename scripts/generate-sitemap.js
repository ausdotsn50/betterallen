import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_WEBSITE_URL || 'https://betterallen.org';

// Helper function to read YAML files
function readYamlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    console.error(`Error reading YAML file ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to read markdown files and extract slugs
function getFileSlugs(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

// Generate sitemap entries
function generateSitemapEntries() {
  const entries = [];

  // Static routes
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/services', priority: '0.8', changefreq: 'weekly' },
    { path: '/government', priority: '0.8', changefreq: 'weekly' },
    {
      path: '/government/elected-officials/committees',
      priority: '0.7',
      changefreq: 'monthly',
    },
    { path: '/tourism', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/about/allen', priority: '0.6', changefreq: 'monthly' },
    { path: '/about/bettergov', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'weekly' },
  ];

  entries.push(...staticRoutes);

  // Dynamic routes from YAML files
  const contentDir = path.join(__dirname, '../content');

  // Services categories
  const servicesFile = path.join(__dirname, '../src/data/services.yaml');
  const servicesData = readYamlFile(servicesFile);
  if (servicesData && Array.isArray(servicesData.categories)) {
    servicesData.categories.forEach(category => {
      entries.push({
        path: `/services/${category.slug}`,
        priority: '0.8',
        changefreq: 'weekly',
      });

      // Service pages within category
      const categoryIndexPath = path.join(
        contentDir,
        'services',
        category.slug,
        'index.yaml'
      );
      const categoryIndex = readYamlFile(categoryIndexPath);
      if (categoryIndex && Array.isArray(categoryIndex.pages)) {
        categoryIndex.pages.forEach(page => {
          entries.push({
            path: `/services/${category.slug}/${page.slug}`,
            priority: '0.7',
            changefreq: 'monthly',
          });
        });
      }
    });
  }

  // Government categories
  const governmentFile = path.join(__dirname, '../src/data/government.yaml');
  const governmentData = readYamlFile(governmentFile);
  if (governmentData && Array.isArray(governmentData.categories)) {
    governmentData.categories.forEach(category => {
      entries.push({
        path: `/government/${category.slug}`,
        priority: '0.7',
        changefreq: 'monthly',
      });

      // Government pages within category
      const categoryIndexPath = path.join(
        contentDir,
        'government',
        category.slug,
        'index.yaml'
      );
      const categoryIndex = readYamlFile(categoryIndexPath);
      if (categoryIndex && Array.isArray(categoryIndex.pages)) {
        categoryIndex.pages.forEach(page => {
          entries.push({
            path: `/government/${category.slug}/${page.slug}`,
            priority: '0.6',
            changefreq: 'monthly',
          });
        });
      }
    });
  }

  // Tourism categories
  const tourismFile = path.join(__dirname, '../src/data/tourism.yaml');
  const tourismData = readYamlFile(tourismFile);
  if (tourismData && Array.isArray(tourismData.categories)) {
    tourismData.categories.forEach(category => {
      entries.push({
        path: `/tourism/${category.slug}`,
        priority: '0.8',
        changefreq: 'weekly',
      });

      // Tourism places within category
      const categoryIndexPath = path.join(
        contentDir,
        'tourism',
        category.slug,
        'index.yaml'
      );
      const categoryIndex = readYamlFile(categoryIndexPath);
      if (categoryIndex && Array.isArray(categoryIndex.places)) {
        categoryIndex.places.forEach(place => {
          entries.push({
            path: `/tourism/${category.slug}/${place.slug}`,
            priority: '0.7',
            changefreq: 'monthly',
          });
        });
      }
    });
  }

  return entries;
}

// Generate XML sitemap
function generateSitemap() {
  const entries = generateSitemapEntries();
  const now = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${entry.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Write sitemap to file
function writeSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    const sitemapContent = generateSitemap();

    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`✓ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`  Base URL: ${BASE_URL}`);
  } catch (error) {
    console.error('Error writing sitemap:', error.message);
    process.exit(1);
  }
}

writeSitemap();
