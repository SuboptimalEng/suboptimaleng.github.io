<template>
  <Articles :articles="articles" />
</template>

<script>
import Articles from '@/components/Articles';

export default {
  components: {
    Articles,
  },
  async asyncData({ $content, params }) {
    const articles = (await $content('articles').fetch()).filter((article) => {
      return article.tags.includes(params.slug);
    });
    return { articles };
  },
};
</script>
