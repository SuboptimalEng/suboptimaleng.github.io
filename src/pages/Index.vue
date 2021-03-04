<template>
  <Layout>
    <div v-for="post in $page.posts.edges" :key="post.id" class="flex flex-col">
      <g-link :to="post.node.path" class="font-medium text-2xl hover:underline">
        {{ post.node.title }}
      </g-link>
      <div class="flex flex-row justify-between">
        <time :datetime="post.node.date" class="text-sm font-light">
          {{ post.node.date }}
        </time>
      </div>
    </div>

    <Pager
      :info="$page.posts.pageInfo"
      class="text-center text-xl font-medium space-x-1"
    />
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (
    filter: { path: { ne: "/blog/about/" } },
    sortBy: "date",
    order: DESC,
    perPage: 10,
    page: $page
  ) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMM D, Y")
        summary
        path
        tags {
          title
        }
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

<style scoped>
.active {
  background-color: lightgray;
  border-radius: 2px;
  padding: 2px;
}
</style>
