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

    <Pagination v-if="total > 1" :total="total" :per-page="1" />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    articles: {
      type: Array,
      default: Array,
    },
    total: {
      type: Number,
      default: 0,
    },
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
