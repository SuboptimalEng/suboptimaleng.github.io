<template>
  <div>
    <div v-for="article in allArticles" :key="article.id">
      <NuxtLink
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
        class="font-semibold text-2xl sm:text-4xl hover:underline"
      >
        {{ article.title }}
      </NuxtLink>

      <div class="flex space-x-1 text-sm sm:text-lg font-light">
        <div>{{ formatDate(article.createdAt) }}</div>
        <div class="font-black">·</div>
        <div class="italic">{{ article.ttr }} min read</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['allArticles', 'paginatedArticles'],

  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMM. Do, YYYY');
      }
    },
  },
};
</script>
