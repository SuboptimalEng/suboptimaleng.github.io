<template>
  <Articles :articles="articles" />
</template>

<script>
import Articles from '@/components/Articles';
import { getMetaTags, DEFAULT_DESCRIPTION } from '@/utils/constants';

export default {
  components: {
    Articles,
  },

  head() {
    return {
      title: 'Tag Search: ' + this.article[0].title + ' - Suboptimal Engineer',
      meta: [
        ...getMetaTags({
          title:
            'Tag Search: ' + this.article[0].title + ' - Suboptimal Engineer',
          description: DEFAULT_DESCRIPTION,
          image: 'https://suboptimaleng.github.io/suboptimal.png',
          url: 'suboptimaleng.github.io',
        }),
      ],
    };
  },

  async asyncData({ $content, params }) {
    const articles = (
      await $content('articles').sortBy('createdAt', 'desc').fetch()
    ).filter((article) => {
      return article.tags.includes(params.slug);
    });
    return { articles };
  },
};
</script>
