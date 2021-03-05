<template>
  <Layout>
    <div class="py-1">
      <div class="font-semibold text-2xl">
        {{ $page.post.title }}
      </div>
      <div class="flex flex-row text-sm font-light">
        <time :datetime="$page.post.date">
          {{ $page.post.date }}
        </time>
        <div class="mx-1 font-black">·</div>
        <div class="italic">{{ $page.post.ttr }} min read</div>
      </div>
      <div v-html="$page.post.content" class="markdown-body py-2" />
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    ttr
    path
    date (format: "MMM D, Y")
    summary
    content
    tags {
      title
      path
    }
  }
}
</page-query>

<script>
import '~/styles/github-markdown.css';

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>
