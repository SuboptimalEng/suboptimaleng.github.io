<template>
  <Articles :articles="paginatedArticles" :total="allArticles.length" />
</template>

<script>
import getContent from '@/utils/getContent';
import Articles from '@/components/Articles';

export default {
  components: {
    Articles,
  },
  async asyncData({ $content, params, error }) {
    const content = await getContent($content, params, error);
    return {
      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
    };
  },
};
</script>
