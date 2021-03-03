<template>
  <div
    class="justify-center m-10 grid grid-cols-1 divide-y divide-gray-500 font-sans"
  >
    <!-- topbar -->
    <div class="flex flex-row justify-between pb-2 font-bold text-2xl">
      <div>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </div>
      <div>
        <g-link to="/" class="mx-4">home</g-link>
        <g-link to="/about/">about</g-link>
      </div>
    </div>

    <!-- content -->
    <slot />

    <!-- footer -->
    <div class="flex flex-row pt-2 justify-center">
      <div v-for="social in socials" class="mx-1 text-2xl">
        <a :href="social.href">
          <font-awesome-icon :icon="social.icon" style="color: #718096" />
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
  color: #211f1f !important;
}
.fa-hacker-news:hover {
  color: #ff6600 !important;
}
</style>
