<template>
  <div>
    <div v-for="article in articles" :key="article.id">
      <NuxtLink
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
        class="font-bold text-3xl lg:text-4xl hover:underline"
      >
        {{ article.title }}
      </NuxtLink>

      <div class="flex space-x-1 text-base lg:text-xl font-light">
        <div>{{ formatDate(article.createdAt) }}</div>
        <div class="font-black">·</div>
        <div class="italic">{{ article.ttr }} min read</div>
      </div>
    </div>

    <div v-if="total > postsPerPage">
      <Pagination :total="total" :per-page="postsPerPage" />
    </div>
    <div v-else class="pb-2"></div>
  </div>
</template>

<script>
import moment from 'moment';
import { POSTS_PER_PAGE } from '@/utils/constants';

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

  data() {
    return {
      postsPerPage: POSTS_PER_PAGE,
    };
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
