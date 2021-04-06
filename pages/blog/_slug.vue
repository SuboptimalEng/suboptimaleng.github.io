<template>
  <div class="pb-6">
    <div class="font-semibold text-2xl lg:text-4xl">
      {{ article.title }}
    </div>

    <div class="space-y-1 text-sm lg:text-lg font-light">
      <div class="flex space-x-1">
        <div>{{ formatDate(article.createdAt) }}</div>
        <div class="font-black">·</div>
        <div class="italic">{{ article.ttr }} min read</div>
      </div>

      <div class="flex space-x-2 font-medium">
        <div v-for="tag in article.tags" :key="tag">
          <NuxtLink
            :to="{ name: 'tag-slug', params: { isTagSearch: true, slug: tag } }"
            class="border border-gray-900 rounded px-2 py-1 hover:bg-gray-900 hover:text-white transform duration-400 ease-in-out"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- article -->
    <nuxt-content :document="article" class="pt-4 prose prose-sm lg:prose-lg" />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    return { article };
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
