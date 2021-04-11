module.exports = {
  POSTS_PER_PAGE: 8,
  DEFAULT_DESCRIPTION: 'The typical blog of an atypical Indian software engineer who quit his tech job to become a YouTuber.',
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
