import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for dynamic meta tags
 * Supports: Title, Description, Keywords, Open Graph, Twitter Cards, Canonical URL, Structured Data
 */
export default function SEOHead({
    title = 'QuranBro - Baca Al-Quran Online Lengkap 114 Surah',
    description = 'Baca Al-Quran online dengan terjemahan Indonesia. 114 Surah lengkap dengan audio, terjemahan per ayat, dan tampilan modern yang indah.',
    keywords = 'Al-Quran, Quran, Al-Quran Online, Baca Quran, Quran Indonesia, Terjemahan Quran, Quran Digital, Islamic App, Muslim App',
    canonical,
    ogType = 'website',
    ogImage = '/og-image.png',
    structuredData,
}) {
    const siteUrl = window.location.origin;
    const currentUrl = canonical || window.location.href;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />
            <meta property="og:site_name" content="QuranBro" />
            <meta property="og:locale" content="id_ID" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
}
