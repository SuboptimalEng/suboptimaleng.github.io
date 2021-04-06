module.exports = {
  POSTS_PER_PAGE: 8,
  DEFAULT_DESCRIPTION: 'The atypical blog of a typical Indian guy who posts educational content on YouTube and dank memes on Twitter.',
  getMetaTags: (data) => [
    {
      hid: 'og:title',
      property: 'og:title',
      content: data.title,
    },
    {
      hid: 'description',
      name: 'description',
      content: data.description,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: data.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: data.image,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
};
