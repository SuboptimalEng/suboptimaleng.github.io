<template>
  <div
    class="grid grid-cols-1 divide-y divide-gray-200 font-sans antialiased max-w-screen-md mx-auto p-4"
  >
    <!-- topbar -->
    <div class="flex flex-row justify-between pb-4 font-bold text-4xl">
      <div>
        <g-link to="/" class="hover:underline">
          <!-- {{ $static.metadata.siteName }} -->
          Suboptimal
        </g-link>
      </div>
      <div class="space-x-2">
        <g-link to="/blog/about/" class="hover:underline">About</g-link>
      </div>
    </div>

    <!-- content -->
    <div class="pt-3 pb-4">
      <slot />
    </div>

    <!-- footer -->
    <div class="flex flex-row pt-4 justify-center">
      <div v-for="social in socials" :key="social.href" class="mx-1 text-4xl">
        <a :href="social.href">
          <font-awesome-icon :icon="social.icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

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
