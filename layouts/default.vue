<template>
  <div
    class="max-w-screen-md mx-auto divide-y font-sans antialiased p-4 text-gray-900"
  >
    <!-- header -->
    <div class="flex justify-between font-bold text-3xl lg:text-5xl pb-4">
      <div v-if="isTagSearch">
        <NuxtLink to="/" class="hover:underline">Sub</NuxtLink>
        / {{ slug }}
      </div>
      <div v-else>
        <NuxtLink to="/" class="hover:underline">Suboptimal</NuxtLink>
      </div>

      <NuxtLink to="/blog/about" class="hover:underline">About ABC</NuxtLink>
    </div>

    <!-- content -->
    <div class="pt-2">
      <Nuxt />
    </div>

    <!-- footer -->
    <div class="flex space-x-1 justify-center text-3xl lg:text-5xl pt-4">
      <div v-for="social in socials" :key="social.href">
        <a :href="social.href">
          <font-awesome-icon :icon="social.icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faGithub,
  faTwitter,
  faHackerNews,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default {
  data() {
    return {
      slug: '',
      isTagSearch: false,
      socials: [
        {
          icon: faTwitter,
          href: 'https://twitter.com/SuboptimalEng',
        },
        {
          icon: faYoutube,
          href: 'https://www.youtube.com/SuboptimalEng',
        },
        {
          icon: faGithub,
          href: 'https://github.com/SuboptimalEng',
        },
        {
          icon: faHackerNews,
          href: 'https://news.ycombinator.com/user?id=SuboptimalEng',
        },
      ],
    };
  },
  watch: {
    $route(to) {
      const { isTagSearch, slug } = to.params;
      this.slug = slug;
      this.isTagSearch = isTagSearch;
    },
  },
};
</script>

<style scoped>
.fa-twitter:hover {
  color: #1da1f2 !important;
}
.fa-youtube:hover {
  color: #ff0000 !important;
}
.fa-github:hover {
  color: #9cdaf1 !important;
}
.fa-hacker-news:hover {
  color: #ff6600 !important;
}
</style>
