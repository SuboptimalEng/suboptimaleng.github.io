<template>
  <Layout>
    <div class="py-1">
      <div class="font-semibold text-3xl">
        {{ $page.post.title }}
      </div>
      <div class="flex flex-row text-sm font-light">
        <time :datetime="$page.post.date">
          {{ $page.post.date }}
        </time>
        <div class="mx-1 font-black">·</div>
        <div class="italic">{{ $page.post.ttr }} min read</div>
      </div>
      <div v-html="$page.post.content" class="markdown-body pt-4" />
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
    description
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
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.post.description,
        },
      ],
    };
  },
};
</script>
