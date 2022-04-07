const fs = require('fs');
const fetch = require('node-fetch');
const prettier = require('prettier');
const DOMAIN = 'https://outfiz.vn';
const getDate = new Date().toISOString();
const axios = require('axios');

const fetchUrl = 'https://192.168.10.100/api/1.0/product/item?limit=0';
const YOUR_AWESOME_DOMAIN = 'https://website.com';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
    // const fetchPosts = await fetch(fetchUrl)
    //     .then((res) => res.json())
    //     .catch((err) => console.log(err));
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    let items = [];
    const fetchPosts = await axios({
        headers: {
            'x-requestid': '0a351787-f209-4b0e-9bbe-83913857508e',
        },

        method: 'GET',
        url: `https://192.168.10.100:8020/api/1.0/product/item`,
        params: {
            limit: 0,
        },
    })
        .then((e) => {
            items = e.data.items;
        })
        .catch((e) => console.log(e));

    const postList = [];
    items.forEach((item) =>
        postList.push(`${item.slug}-${item.itemBrandCode}`),
    );

    const postListSitemap = `
    ${postList
        .map((id) => {
            return `
          <url>
            <loc>${`${DOMAIN}/item/${id}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
        })
        .join('')}
  `;

    const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `;

    const formattedSitemap = [formatted(generatedSitemap)];

    fs.writeFileSync(
        'public/sitemap-products.xml',
        formattedSitemap,
        'utf8',
    );
})();
