/**
 * Sitemap Generator for Quran Web
 * Generates a sitemap.xml file with all pages including:
 * - Homepage
 * - All 114 Surah pages
 * - All ayat pages within each surah
 */

/**
 * Generate sitemap XML content
 * @param {string} baseUrl - The base URL of your website
 * @param {Array} surahs - Array of surah data from API
 * @returns {string} XML sitemap content
 */
export function generateSitemap(baseUrl, surahs) {
    const now = new Date().toISOString();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Homepage
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';

    // Surah pages
    surahs.forEach(surah => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/surah/${surah.nomor}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += '    <changefreq>monthly</changefreq>\n';
        xml += '    <priority>0.9</priority>\n';
        xml += '  </url>\n';

        // Ayat pages within each surah
        for (let ayat = 1; ayat <= surah.jumlah_ayat; ayat++) {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/surah/${surah.nomor}/${ayat}</loc>\n`;
            xml += `    <lastmod>${now}</lastmod>\n`;
            xml += '    <changefreq>yearly</changefreq>\n';
            xml += '    <priority>0.7</priority>\n';
            xml += '  </url>\n';
        }
    });

    xml += '</urlset>';

    return xml;
}

/**
 * Download sitemap as XML file
 * Usage: Call this function in browser console or from a component
 */
export function downloadSitemap(baseUrl, surahs) {
    const sitemapContent = generateSitemap(baseUrl, surahs);
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Example usage:
 * 
 * import { generateSitemap, downloadSitemap } from './utils/sitemap-generator';
 * import { useQuran } from './context/QuranContext';
 * 
 * const { allSurahs } = useQuran();
 * const sitemapXml = generateSitemap('https://yourwebsite.com', allSurahs);
 * console.log(sitemapXml);
 * 
 * // Or download directly:
 * downloadSitemap('https://yourwebsite.com', allSurahs);
 */
