<template>
  <Articles :articles="paginatedArticles" :total="allArticles.length" />
</template>

<script>
import Articles from '@/components/Articles';
import getContent from '@/utils/getContent';

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
