<template>
  <div>
    <div v-for="article in articles" :key="article.id">
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
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .sortBy('createdAt', 'desc')
      .fetch();
    return { articles };
  },

  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MMM. Do, YYYY');
      }
    },
  },
};
</script>
