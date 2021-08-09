<template>
  <div
    class="max-w-screen-md mx-auto divide-y font-sans antialiased p-4 text-gray-900"
  >
    <!-- header -->
    <div class="flex justify-between font-black text-2xl lg:text-4xl pb-4">
      <div v-if="isTagSearch">
        <NuxtLink to="/" class="hover:underline">Sub</NuxtLink>
        / {{ slug }}
      </div>
      <div v-else>
        <NuxtLink to="/" class="hover:underline">Suboptimal</NuxtLink>
      </div>

      <div
        class="hidden sm:flex items-center space-x-4 text-lg lg:text-2xl font-bold"
      >
        <NuxtLink to="/blog/2021-01-about" class="hover:underline">
          About
        </NuxtLink>
        <NuxtLink
          to="/"
          class="hover:underline"
          @click.native="showMenu = !showMenu"
        >
          Blog
        </NuxtLink>
        <NuxtLink to="/blog/1" class="hover:underline"> Projects </NuxtLink>
        <a :href="twitter.href" target="_blank">
          <font-awesome-icon :icon="twitter.icon" />
        </a>
      </div>

      <div class="sm:hidden flex text-lg items-center">
        <div @click="showMenu = !showMenu">
          <font-awesome-icon :icon="menu.icon" />
        </div>
        <div
          v-if="showMenu"
          class="absolute top-0 right-0 w-screen h-screen bg-white z-10"
        >
          <div class="p-4 flex flex-col text-2xl space-y-4">
            <div class="flex justify-between">
              <NuxtLink
                to="/blog/2021-01-about"
                class="hover:underline"
                @click.native="showMenu = !showMenu"
              >
                About
              </NuxtLink>
              <div @click="showMenu = !showMenu">
                <font-awesome-icon :icon="close.icon" />
              </div>
            </div>
            <NuxtLink
              to="/"
              class="hover:underline"
              @click.native="showMenu = !showMenu"
            >
              Blog
            </NuxtLink>
            <NuxtLink
              to="/blog/1"
              class="hover:underline"
              @click.native="showMenu = !showMenu"
            >
              Projects
            </NuxtLink>
            <a
              :href="twitter.href"
              target="_blank"
              class="hover:underline"
              @click="showMenu = !showMenu"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="py-4">
      <Nuxt />
    </div>

    <!-- footer -->
    <div class="flex space-x-1 justify-center text-3xl lg:text-4xl pt-4">
      <div v-for="social in socials" :key="social.href">
        <a :href="social.href" target="_blank">
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
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  data() {
    return {
      slug: '',
      showMenu: false,
      isTagSearch: false,
      twitter: {
        icon: faTwitter,
        href: 'https://twitter.com/SuboptimalEng',
      },
      menu: {
        icon: faBars,
      },
      close: {
        icon: faTimes,
      },
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
