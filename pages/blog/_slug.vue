<template>
  <div class="mb-4">
    <div class="mb-8">
      <div class="font-bold text-2xl lg:text-4xl">
        {{ article.title }}
      </div>

      <div class="space-y-1 text-base lg:text-xl font-light">
        <div class="flex space-x-1">
          <div>{{ formatDate(article.createdAt) }}</div>
          <div class="font-black">·</div>
          <div class="italic">{{ article.ttr }} min read</div>
        </div>

        <div class="flex space-x-2 font-medium">
          <div v-for="tag in article.tags" :key="tag">
            <NuxtLink
              :to="{
                name: 'tag-slug',
                params: { isTagSearch: true, slug: tag },
              }"
              class="border border-gray-900 rounded px-2 py-1 hover:bg-gray-900 hover:text-white transform duration-400 ease-in-out"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- article -->
    <nuxt-content :document="article" class="prose lg:prose-xl" />
  </div>
</template>

<script>
import moment from 'moment';
import { getMetaTags, DEFAULT_DESCRIPTION } from '@/utils/constants';

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    return { article };
  },

  head() {
    return {
      // FYI: This is for title on the chrome tab
      title: this.article.title + ' - Suboptimal Engineer',
      meta: [
        ...getMetaTags({
          title: this.article.title + ' - Suboptimal Engineer',
          description: this.article.description || DEFAULT_DESCRIPTION,
          image: 'https://suboptimaleng.github.io/suboptimal.png',
          url: 'suboptimaleng.github.io',
        }),
      ],
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
