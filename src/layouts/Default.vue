<template>
  <div class="justify-center">
    <!-- topbar -->
    <div class="flex flex-row justify-between">
      <div>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </div>
      <div>
        <g-link to="/">home</g-link>
        <g-link to="/about/">about</g-link>
      </div>
    </div>

    <!-- content -->
    <slot />

    <!-- footer -->
    <div class="flex flex-row justify-center">
      <div v-for="social in socials" class="mx-1">
        <a :href="social.href">
          <font-awesome-icon :icon="social.icon" size="lg" />
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
  color: #ad5c51 !important;
}
.fa-hacker-news:hover {
  color: #ff6600 !important;
}
</style>
