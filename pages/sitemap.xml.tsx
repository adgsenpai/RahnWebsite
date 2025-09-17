import { PrismaClient } from '@prisma/client';
import { returnAllPosts } from '../wordpress/api';
const generateSiteMap = async (posts: any) => {
    const baseUrl = 'https://rahn.co.za';
    var today = new Date();
    const pages = [
        {
            url: '/',
            changefreq: 'daily',
            priority: 1.0, // Home page is usually the most important
            lastmod: today.toISOString(),
        },
        {
            url: '/recruitment',
            changefreq: 'monthly',
            priority: 0.5, // Login page is important but typically doesn't need to be crawled as often
            lastmod: today.toISOString(),
        },
        {
            url: '/rahnmonitor',
            changefreq: 'weekly',
            priority: 0.8, // Pricing page is important for potential customers
            lastmod: today.toISOString(),
        },
        {
            url: '/consulting',
            changefreq: 'weekly',
            priority: 0.9, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/testimonials',
            changefreq: 'weekly',
            priority: 0.7, // Leaderboard may be important but not as much as pricing information
            lastmod: today.toISOString(),
        },
        {
            url: '/who-we-are',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/blogs',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/software',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/consulting',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/cv',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
        {
            url: '/financialcrime',
            changefreq: 'weekly',
            priority: 0.6, // Genre pages are useful but might not be as critical as the pricing or home page
            lastmod: today.toISOString(),
        },
    ];
 

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
      ${pages
            .map(
                (page) => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          ${page.lastmod
                        ? `<lastmod>${page.lastmod}</lastmod>`
                        : '<lastmod>2021-08-01</lastmod>'
                    }
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `,
            )
            .join('')} 
      ${posts.map((post: any) => `
  <url>
    <loc>${baseUrl}${post.node.uri.replace(/&/g, '&amp;')}</loc>
    <lastmod>${today.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`).join('')}

   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

//@ts-ignore
export async function getServerSideProps({ res }) {

    async function fetchPosts() {
        try {
            const fetchedPosts = await returnAllPosts();
            var posts = fetchedPosts
        } catch (error) {
            console.error('Error fetching posts:', error);
            //@ts-ignore
            var posts = [];
        }
        return posts;
    }

    var posts = await fetchPosts();
    console.log(posts[0])

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    var siteMap = await generateSiteMap(posts);
    res.write(siteMap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;