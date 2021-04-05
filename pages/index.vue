<template>
  <!-- <Articles :articles="articles" /> -->
  <Articles :allArticles="allArticles" :paginatedArticles="paginatedArticles" />
</template>

<script>
import Articles from '@/components/Articles';
import getContent from '@/utils/getContent';

export default {
  components: {
    Articles,
  },
  // async asyncData({ $content }) {
  //   const articles = await $content('articles')
  //     .sortBy('createdAt', 'desc')
  //     .fetch();
  //   return { articles };
  // },
  async asyncData({ $content, params, error }) {
    const content = await getContent($content, params, error);
    return {
      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
    };
  },
};
</script>
