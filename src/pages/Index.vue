<template>
  <Layout>
    <div
      v-for="post in $page.posts.edges"
      :key="post.id"
      class="flex flex-row justify-between"
    >
      <g-link :to="post.node.path" rel="bookmark">{{ post.node.title }}</g-link>
      <time :datetime="post.node.date">{{ post.node.date }}</time>
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, page: $page) {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        summary
        path
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome';

export default {
  components: {
    Pager,
  },
  metaInfo: {
    title: 'blog',
  },
};
</script>