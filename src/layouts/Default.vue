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
    <div class="flex flex-row">
      <div v-for="link in links" class="mx-1">
        <a :href="link.href" :class="link.hover">{{ link.name }}</a>
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
export default {
  data() {
    return {
      links: [
        {
          name: 'tw',
          hover: 'hover:bg-blue-500',
          href: 'https://twitter.com/SuboptimalEng',
        },
        {
          name: 'yt',
          hover: 'hover:bg-red-500',
          href: 'https://www.youtube.com/SuboptimalEng',
        },
        {
          name: 'gh',
          hover: 'hover:bg-blue-500',
          href: 'https://github.com/SuboptimalEng',
        },
        {
          name: 'yc',
          hover: 'hover:bg-yellow-500',
          href: 'https://news.ycombinator.com/user?id=SuboptimalEng',
        },
      ],
    };
  },
};
</script>
