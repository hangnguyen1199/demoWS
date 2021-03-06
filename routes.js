const routes = require('next-routes');

module.exports = routes()
  .add('recruitment')
  .add('account-info')
  .add('cart')
  .add('wishlist')
  .add('item')
  .add('search')
  .add('category')
  .add('product-list-new')
  .add('product-list-supper-sale')
  .add('product-list-trend')
  .add('sign-in')
  .add('order')
  .add('quy-dinh')
  .add('lien-he')
  .add('about-us')
  .add('news')
  .add('account/order-management')
  .add('promotion')
  .add('mail-box')
  .add('branch-list')
  .add('category/[slug]')
  .add('danh-muc/[slug]')
  .add('san-pham/[slug]')
  .add('tim-kiem-don-hang')
  .add('tracking-order')
  // .add('tim-kiem')
  .add('challenge');
