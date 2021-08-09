import { POSTS_PER_PAGE } from '@/utils/constants';

export default async ($content, params, error) => {
  const currentPage = parseInt(params.page);

  const perPage = POSTS_PER_PAGE;

  // use desc to display the article that was created last, first
  const allArticles = await $content('articles')
    .sortBy('updatedAt', 'desc')
    .fetch();

  // const totalArticles = allArticles.length;

  // use Math.ceil to round up to the nearest whole number
  // const lastPage = Math.ceil(totalArticles / perPage);

  // use the % (modulus) operator to get a whole remainder
  // const lastPageCount = totalArticles % perPage;

  const skipNumber = () => {
    // if (currentPage === 1) {
    //   return 0;
    // }
    // if (currentPage === lastPage) {
    //   return totalArticles - lastPageCount - perPage;
    // }
    return (currentPage - 1) * perPage;
  };

  // use desc to display the article that was created last, first
  const paginatedArticles = await $content('articles')
    .sortBy('updatedAt', 'desc')
    .limit(perPage)
    .skip(skipNumber())
    .fetch();

  if (currentPage === 0 || !paginatedArticles.length) {
    return error({ statusCode: 404, message: 'No articles found!' });
  }

  return {
    allArticles,
    paginatedArticles,
  };
};
