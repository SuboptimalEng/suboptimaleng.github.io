<template>
  <Layout>
    <div class="py-1">
      <div class="font-semibold text-2xl sm:text-4xl">
        {{ $page.post.title }}
      </div>

      <div class="text-sm space-y-1 sm:text-lg font-light">
        <div class="flex space-x-1">
          <time :datetime="$page.post.date">
            {{ $page.post.date }}
          </time>
          <div class="font-black">·</div>
          <div class="italic">{{ $page.post.ttr }} min read</div>
        </div>
        <div class="flex space-x-2 font-medium">
          <div v-for="tag in $page.post.tags" :key="tag.id">
            <g-link
              :to="tag.path"
              class="bg-gray-200 rounded px-2 py-1 hover:underline"
            >
              {{ tag.id }}
            </g-link>
          </div>
        </div>
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
      id
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
