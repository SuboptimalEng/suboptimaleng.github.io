<template>
  <Layout>
    <div class="my-1">
      <h1>{{ $page.post.title }}</h1>

      <div>
        Tags:
        <g-link v-for="tag in $page.post.tags" :to="tag.path" :key="tag.id">
          #{{ tag.title }}
        </g-link>
      </div>

      <p>Posted on {{ $page.post.date }}</p>

      <div>{{ $page.post.ttr }} min read</div>

      <div
        class="markdown-body mb-8"
        id="article-area"
        v-html="$page.post.content"
      />
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    ttr
    path
    date (format: "MMMM D, Y")
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
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>
